document.addEventListener("DOMContentLoaded", event => {
  if (event) {
    console.info("Inventory DOM loaded");
  }

  const fileInput = document.getElementById("input-files");
  let base64String;

  // listen for the change event so we can capture the file
  fileInput.addEventListener("change", e => {
    // get a reference to the file
    const file = e.target.files[0];

    // checking for valid image format
    // eslint-disable-next-line eqeqeq
    if (file.name.split(".")[1] != "JPG" && file.name.split(".")[1] != "PNG") {
      alert("upload a vaild image with .jpg or .png format");
      document.getElementById("input-files").value = "";
    }
    // encode the file using the FileReader API
    const reader = new FileReader();
    reader.onloadend = () => {
      // remove data url part
      base64String = reader.result.replace("data:", "").replace(/^.+,/, "");
    };
    reader.readAsDataURL(file);
  });

  // CREATE
  const createSubmitBtn = document.getElementById("create-form");

  if (createSubmitBtn) {
    createSubmitBtn.addEventListener("submit", e => {
      e.preventDefault();

      const d = new Date();
      const yyyy = d.getFullYear();
      const mm = d.getMonth();
      const dd = d.getDate();
      const hh = d.getHours();
      const m = d.getMinutes();
      const s = d.getSeconds();
      const imgURLname = `/img/${yyyy}${mm}${dd}${hh}${m}${s}.JPG`;

      // Grabs the value of the textarea that goes by the name, "quote"
      const newProduct = {
        product_name: document.getElementById("product-name").value.trim(),
        product_description: document
          .getElementById("inventory-description")
          .value.trim(),
        inventory: document.getElementById("inventory-quantity").value.trim(),
        selling_price: document.getElementById("inventory-price").value.trim(),
        product_url: imgURLname,
        product_image: base64String
      };

      // Send POST request to create a new quote
      fetch("/api/inventory", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },

        // make sure to serialize the JSON body
        body: JSON.stringify(newProduct)
      }).then(() => {
        // Empty the form
        document.getElementById("product-name").value = "";
        document.getElementById("inventory-description").value = "";
        document.getElementById("inventory-quantity").value = "";
        document.getElementById("inventory-price").value = "";
        document.getElementById("input-files").value = "";
        // Reload the page so the user can see the new quote
        console.log("Created a new Product");
        location.reload();
      });
    });
  }

  //DELETE
  const deleteItemBtns = document.querySelectorAll(".delete-item");

  deleteItemBtns.forEach(button => {
    button.addEventListener("click", e => {
      const id = e.target.getAttribute("data-id");
      console.log(id);

      // Send the delete request
      fetch(`/api/inventory/${id}`, {
        method: "DELETE"
      }).then(res => {
        console.log(res);
        console.log(`Deleted item: ${id}`);

        // Reload the page
        // location.reload();
      });
    });
  });
});
