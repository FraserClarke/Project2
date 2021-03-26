document.addEventListener("DOMContentLoaded", event => {
  if (event) {
    console.info("Storefront DOM loaded");
  }

  const cartBtn = document.querySelectorAll(".cartBtnH");
  const cart = document.getElementById("cartId");
  console.log(cart);
  // update customer id
  const customerDataId = document
    .getElementById("loginUser")
    .getAttribute("data-id");

  console.log(customerDataId);
  if (cartBtn) {
    cartBtn.forEach(button => {
      button.addEventListener("click", e => {
        e.preventDefault();

        const newCart = {
          ProductId: e.target.getAttribute("data-id"),
          CustomerId: customerDataId,
          quantity: 1,
          order_status: "cart-item"
        };

        fetch("/api/cartItem", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(newCart)
        }).then(() => {
          // Reload the page so the user can see the new quote
          console.log("Created a new Cart Item");
          location.reload();
        });
      });
    });
  }

  const orderBtn = document.querySelector(".orderBtn");

  if (orderBtn) {
    orderBtn.addEventListener("click", e => {
      e.preventDefault();
      const customerID = document
        .getElementById("loginUser")
        .getAttribute("data-id");

      fetch(`/api/confirmedOrders/${customerID}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }).then(() => location.reload());
      confirm("Thank you for your order!");
    });
  }
});
