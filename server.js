const mysql2 = require("mysql2");
const express = require("express");
const exphbs = require("express-handlebars");
const htmlRouter = require("./routes/html-routes.js");
const apiRouter = require("./routes/api-routes.js");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

// Sets up the Express App
const app = express();
const authTokens = {};
const PORT = process.env.PORT || 8080;

let connection;

if (process.env.JAWSDB_URL) {
  connection = mysql2.createPool(process.env.JAWSDB_URL);
} else {
  // eslint-disable-next-line no-unused-vars
  connection = mysql2.createPool({
    host: "us-cdbr-east-03.cleardb.com",
    user: "b019518f162a28",
    password: "qdcee841",
    database: "heroku_399bs8cbs6e9s9f"
  });
}

// Requiring our models for syncing
const db = require("./models");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static("public"));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Invoke routes
app.use(htmlRouter);
app.use(apiRouter);

// authentication code.
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

app.use((req, res, next) => {
  const authToken = req.cookies.AuthToken;
  req.customer = authTokens[authToken];
  next();
});

// Syncing our sequelize models and then starting our Express app
// !! REMOVE "{ force: true }" @ deployment !!
db.sequelize.sync().then(() => {
  app.listen(PORT, () =>
    // eslint-disable-next-line implicit-arrow-linebreak
    console.log("Server listening on: http://localhost:" + PORT)
  );
});
