const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const AuthRouter = require('./routers/AuthRouter');
const StudentRouter = require('./routers/StudentRouter');
const { connectDB } = require('./config/connDB');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET || "secret123",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

connectDB();

app.use('/auth', AuthRouter);
app.use('/students', StudentRouter);

mongoose.connection.once('open', () => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT, () => {
        console.log(` Server is running on port ${process.env.PORT}`);
    });
});

module.exports = { app };
