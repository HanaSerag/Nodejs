const express = require('express');
const session = require('express-session');
require('dotenv').config();
const cors = require('cors');
const fetch = require('node-fetch');
const authRouter = require('./router/authRouter');

const app = express();
app.use(express.json());
app.use(cors());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        maxAge: 1000 * 60,
        httpOnly: true
    }
}));

app.use('/auth', authRouter);

app.get('/users', async (req, res) => {
    try {
        const token = req.headers['authorization'];

        const authResponse = await fetch(`http://localhost:5002/validate`, {
            headers: { "Authorization": token }
        });

        if (authResponse.status !== 200) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const usersResponse = await fetch(`http://localhost:5001/users`);
        const data = await usersResponse.json();

        res.json(data);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error connecting to Users service" });
    }
});

app.listen(process.env.PORT, () => {
    console.log(`Gateway Server is running on port ${process.env.PORT}...........`);
});
