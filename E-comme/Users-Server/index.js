const express = require("express");
const mongoose = require("mongoose");
const usersRoutes = require("./router/usersRoutes");

const app = express();
app.use(express.json());

// استخدام الراوتر
app.use("/users", usersRoutes);

mongoose.connect("mongodb://localhost:27017/yourDB")
  .then(() => {
    app.listen(5001, () => console.log("Users-Server running on port 5001"));
  })
  .catch(err => console.log(err));
