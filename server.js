const express = require("express");
const exphbs = require("express-handlebars");
const htmlRouter = require("./routes/html-routes.js");
const apiRouter = require("./routes/api-routes.js");
const cookieParser = require('cookie-parser');
//const bodyParser = require('body-parser');

//const crypto = require("./config/crypto");

// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 8080;

// Requiring our models for syncing
const db = require("./models");

// Sets up the Express app to handle data parsing
//app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static("public"));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Invoke routes
// htmlRouter(app);
// apiRouter(app);
app.use(htmlRouter);
app.use(apiRouter);

app.use(cookieParser());

app.use((req, res, next) => {
  const authToken = req.cookies["AuthToken"];
  req.user = authTokens[authToken];
  next();
});

// Syncing our sequelize models and then starting our Express app
// !! REMOVE "{ force: true }" @ deployment !!
db.sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
});
