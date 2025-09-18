const express = require('express');
const path = require('path');
const { connectDB } = require('./Config/db');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.set('json spaces', 2);

connectDB();

mongoose.connection.once('open', () => {
  console.log("✅ MongoDB connected");
  app.listen(process.env.PORT || 3000, () => {
    console.log(`Server running on http://localhost:${process.env.PORT || 3000}`);
  });
});

mongoose.connection.on('error', (err) => {
  console.log(" MongoDB connection error");
  console.log(err);
});

require('./EndPoints')(app);
