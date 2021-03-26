const express = require("express");
const db = require("../models");
const router = express.Router();
const crypt = require("../config/crypto");

// Authentication starts below
const authTokens = {};
let customers = [];

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = crypt.getHashedPassword(password);
  customers = [];
  // helo@me
  // password

  db.Customer.findOne({
    where: { email: email },
    attributes: [
      "id",
      "first_name",
      "last_name",
      "email",
      "user_password",
      "client_type"
    ]
  }).then(d => {
    checked = true;
    if (d === null) {
      customers.push({
        isValid: false,
        client_type: "notFound",
        loginMessage: "User not found, try again",
        createMessage: "or Create account.",
        user_password: ""
      });
      return res.redirect(301, "/");
    }
    customers.push(d.dataValues);

    const customer = customers.find(c => {
      return (
        c.email.toLowerCase() === email.toLowerCase() &&
        hashedPassword === c.user_password
      );
    });

    if (customer) {
      const authToken = crypt.generateAuthToken();

      authTokens[authToken] = email;
      res.cookie("AuthToken", authToken);

      customers[0].isValid = true;
      customers[0].first_name = d.first_name;
      customers[0].last_name = d.last_name;
      customers[0].client_type = d.client_type;
      customers[0].user_password = "";
      if (customers[0].client_type === "business-owner") {
        customers[0].businessOwner = true;
        res.redirect(301, "/salesDash");
      } else {
        customers[0].businessOwner = false;
        res.redirect(301, "/storeFront");
      }
      return;
    }
    customers[0].isValid = false;
    customers[0].client_type = "wrongPass";
    customers[0].loginMessage = "Wrong password, try again";
    customers[0].user_password = "";
    res.redirect(301, "/");
  });
});

router.post("/createAccount", (req, res) => {
  // eslint-disable-next-line no-unused-vars
  const {
    firstName,
    lastName,
    emailAddress,
    password,
    confirmPassword,
    businessName,
    phoneNumber,
    selectBusiness
  } = req.body;

  console.log(req.body);

  //Check if the password and confirm password fields match
  db.Customer.findOne({ where: { email: emailAddress } }).then(data => {
    //Check if user with the same email is registered

    console.log(data);
    if (data) {
      // User already created
      return res.redirect(301, "/createAccount");
    }
    customers.push({
      isValid: false
    });
    if (password === confirmPassword) {
      // Check if the 'Are you a busines Owner" checked OR not
      // Store user into database
      console.log(selectBusiness);
      const hashedPassword = crypt.getHashedPassword(password);
      if (selectBusiness) {
        db.Customer.create({
          first_name: firstName,
          last_name: lastName,
          email: emailAddress,
          user_password: hashedPassword,
          client_type: "business-owner",
          business_name: businessName,
          phone_number: parseInt(phoneNumber)
        }).then(result => console.log(result));
        customers[0].isValid = true;
        customers[0].first_name = firstName;
        customers[0].last_name = lastName;
        customers[0].businessOwner = true;
        return res.redirect(301, "/salesdash");
      }

      db.Customer.create({
        first_name: firstName,
        last_name: lastName,
        email: emailAddress,
        user_password: hashedPassword
      }).then(result => console.log(result));
      customers[0].isValid = true;
      customers[0].first_name = firstName;
      customers[0].last_name = lastName;
      customers[0].businessOwner = false;
      return res.redirect(301, "/storefront");
    }
    customers[0].isValid = false;
    customers[0].client_type = "wrongPass";
    customers[0].user_password = "";
    return res.redirect(301, "/createAccount");
  });
});

router.get("/", (req, res) => {
  let msg = "";
  let msg2 = "";
  if (customers[0]) {
    msg = customers[0].loginMessage;
    msg2 = customers[0].createMessage;
  }
  res.render("index", {
    message: msg,
    message2: msg2,
    heading: "SourceE-commerce",
    sidebar: false
  });
});

router.get("/createAccount", (req, res) => {
  res.render("createAccount", {
    heading: "Create Account",
    sidebar: false
  });
});

router.get("/storeFront", (req, res) => {
  db.Products.findAll().then(data => {
    if (customers) {
      customers.push({
        id: "",
        isValid: false
      });
    }
    db.Orders.findAll({
      where: {
        CustomerId: customers[0].id,
        order_status: "cart-item"
      },
      include: [db.Products, db.Customer]
    }).then(order => {
      const obj = data;
      const cartItem = [];
      order.forEach(item => {
        cartItem.push({
          productName: item.Product.product_name,
          price: item.Product.selling_price
        });
      });
      console.log(cartItem);
      res.render("storeFront", {
        cartItems: cartItem,
        customerInfo: customers[0],
        products: obj,
        heading: "Storefront",
        sidebar: true
      });
    });
  });
});

router.get("/inventory", (req, res) => {
  db.Products.findAll().then(data => {
    const obj = data;
    console.log(customers[0]);
    res.render("inventory", {
      customerInfo: customers[0],
      products: obj,
      heading: "Inventory",
      sidebar: true
    });
  });
});

router.get("/salesDash", (req, res) => {
  db.Orders.findAll({
    include: [db.Products, db.Customer],
    where: { order_status: "confirmed-order" }
  }).then(data => {
    const obj = [];
    data.forEach(i => {
      obj.push({
        id: i.dataValues.id,
        date: i.dataValues.createdAt,
        customerName: `${i.dataValues.Customer.first_name} ${i.dataValues.Customer.last_name}`,
        productName: i.dataValues.Product.product_name,
        price: `$${i.dataValues.Product.selling_price}`,
        quantity: i.dataValues.quantity,
        total:
          parseInt(i.dataValues.Product.selling_price) *
          parseInt(i.dataValues.quantity)
      });
    });
    console.log(customers[0]);
    res.render("salesDash", {
      customerInfo: customers[0],
      orders: obj.reverse(),
      heading: "Sales Dashboard",
      sidebar: true
    });
  });
});

module.exports = router;
