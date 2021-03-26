document.addEventListener("DOMContentLoaded", event => {
  if (event) {
    console.info("Login DOM loaded 🚀");
  }

  /* eslint-disable prettier/prettier */
  document.getElementById("login-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const emailInput = document.getElementById("email-address").value.trim();
    const passwordInput = document.getElementById("passwordInput").value.trim();

    fetch("/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailInput,
        password: passwordInput,
      }),
    }).then((res) => {
      console.log(res);
      window.location.href = res.url;
    });
  });
});
