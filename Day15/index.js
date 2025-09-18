const express = require('express');
const { connectDB } = require('./config/db');
const mongoose = require('mongoose');
const authRouter = require('./router/authRouter');
const studentRouter = require('./router/studentRouter');
const userRouter = require('./router/userRouter');
const session = require("express-session");
const cors = require('cors');
const { checkAuth } = require('./middleware/checkAuth');

require('dotenv').config();

const app = express();

app.use(express.json());

const ips = ['http://127.0.0.1:3000', "http://localhost:3000", "http://127.0.0.1:5500"];
app.use(cors({
    origin: (ip, callback) => {
        if (!ip || ips.includes(ip)) {
            callback(null, true);
        } else {
            callback("Not allowed by CORS");
        }
    }
}));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60,
        httpOnly: true,
        secure: false
    }
}));

app.use('/auth', authRouter);
app.use('/students', studentRouter);
app.use('/users', userRouter);

connectDB();

mongoose.connection.once('connected', () => {
    console.log("MongoDB connected..............");
    app.listen(process.env.PORT, () => console.log('Server Running...........'));
});

mongoose.connection.on('error', (err) => {
    console.log(err);
});
