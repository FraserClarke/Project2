const express = require("express");
const fs = require("fs");
const db = require("../models");
const router = express.Router();

router.get("/api/customers", (req, res) => {
  db.Customer.findAll().then(data => {
    res.json(data);
  });
});

router.get("/api/products", (req, res) => {
  db.Products.findAll().then(data => {
    res.json(data);
  });
});

router.get("/api/orders", (req, res) => {
  db.Orders.findAll({
    include: [db.Products, db.Customer]
  }).then(data => {
    res.json(data);
  });
});

// post new product into the inventory
router.post("/api/inventory", (req, res) => {
  // converting base64 data to binary
  const base64Data = req.body.product_image;
  const buff = new Buffer(base64Data, "base64");
  req.body.product_image = buff;

  // save the record to database and generate image in public folder
  db.Products.create(req.body).then(result => {
    db.Products.findOne({
      where: {
        id: result.id
      }
    }).then(res => {
      fs.writeFileSync(`./public${res.product_url}`, res.product_image);
    });
    res.json({ id: result.insertId });
  });
});

// get new cart-item specific customer
router.get("/api/cartItem/:id", (req, res) => {
  db.Orders.findAll({
    where: { CustomerId: req.params.id, order_status: "cart-item" }
  }).then(result => res.json(result));
});

// post new cart-item into order list
router.post("/api/cartItem", (req, res) => {
  db.Orders.create(req.body).then(result => res.json({ id: result.insertId }));
});

// put cart-items of current user into confirmed-order
router.put("/api/confirmedOrders/:id", (req, res) => {
  db.Orders.update(
    { order_status: "confirmed-order" },
    { where: { CustomerId: req.params.id, order_status: "cart-item" } }
  ).then(result => {
    if (result.changedRows === 0) {
      return res.status(404).end();
    }
    res.status(200).end();
  });
});

router.delete("/api/inventory/:id", (req, res) => {
  console.log(req.params);
  db.Products.destroy({
    where: { id: req.params.id }
  }).then(result => {
    if (result.affectedRows === 0) {
      return res.status(404).end();
    }
    res.status(200).end();
  });
});

// sales chart data
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const startDate = new Date().getDate();
const weekly = new Date().setDate(startDate - 7);

router.get("/api/chartData", (req, res) => {
  db.Orders.findAll({
    include: [
      {
        model: db.Products,
        attributes: ["product_name", "selling_price"]
      }
    ],
    where: {
      order_status: "confirmed-order",
      createdAt: {
        [Op.between]: [weekly, new Date()]
      }
    },
    attributes: ["createdAt", "quantity", "order_status"]
  }).then(data => {
    const helper = [];
    const result = [];

    for (n = startDate; n > startDate - 8; n--) {
      helper.push({ dateOrder: n, totalSale: 0 });
    }

    // convert data format
    data.forEach(item => {
      const i = item.dataValues;
      const newObj = {
        dateOrder: i.createdAt.getDate(),
        totalSale: i.quantity * i.Product.selling_price
      };
      helper.push(newObj);
    });

    helper.reduce((res, value) => {
      if (!res[value.dateOrder]) {
        res[value.dateOrder] = {
          dateOrder: value.dateOrder,
          totalSale: 0
        };
        result.push(res[value.dateOrder]);
      }
      res[value.dateOrder].totalSale += value.totalSale;
      return res;
    }, {});

    res.json(result);
  });
});

module.exports = router;
