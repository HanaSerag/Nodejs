const express = require('express');
const app = express();

app.get('/users', (req, res) => {
    const users = [
        { id: 1, name: "Hana" },
        { id: 2, name: "Omar" }
    ];
    res.json(users);
});

app.listen(5001, () => {
    console.log("Users Service running on port 5001");
});
