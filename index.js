const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./util/database");
const User = require("./models/user");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});

app.get("/", (req, res, next) => {
  res.send("Hello world");
});

app.use("/users", require("./routes/users"));

app.use((error, req, res, next) => {
  console.log(err);
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message: message });
});

sequelize
  .sync()
  .then((result) => {
    console.log("database connected");
    app.listen(PORT);
  })
  .catch((err) => console.log(err));
