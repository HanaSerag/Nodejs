// Express Server Entry Point
const express = require('express');
const { loadTasks, loadUsers, saveTasks, saveUsers } = require('./bouns');

const app = express();
const PORT = 6060;

// Local Database
const tasks = [];
const users = [];

loadTasks(tasks, "data/tasks.json");
loadUsers(users, "data/users.json");

// Middleware
app.use(express.json());

// Routes
app.get('/api/tasks', (req, res) => {//res.json
    // should get all tasks from tasks array
    res.json(tasks);
});

app.get('/api/tasks/search', (req, res) => {
    // query string should contain keyword and we should search in tasks array using this keyword
    // If the keyword exists on title or description we should respond with this task
    const keyword = req.query.keyword;
    const results = tasks.filter(task =>
        task.title.includes(keyword) || task.description.includes(keyword)
    );
    res.json(results);
});

app.post('/api/tasks', (req, res) => {
    // body should contain these info title, description, priority(high, low, medium)
    const { title, description, priority } = req.body;
    const Priorities = ['high', 'medium', 'low'];

    if (!title || !description || !priority)
        return res.json({ error: 'Missing required fields' });

    if (!Priorities.includes(priority))
        return res.json({ error: 'Priority must be high, medium, or low' });

    const newTask = { id: tasks.length + 1, title, description, priority };
    tasks.push(newTask);
    res.json(newTask);
    // KEEP THIS CODE AFTER ADDING TASK TO TASKS ARRAY
    saveTasks(tasks, "data/tasks.json");
});

app.get("/profile", (req, res)  => {
    // we get query string from req and search user in users array
    const username = req.query.username;
    const user = users.find(u => u.username === username);
    if (user)
        res.json(user);
    else
        res.json({ error: 'User not found' });
});

app.post("/register", (req, res)  => {
    // body should contain these info username, email, password
const { username, password, email } = req.body;
if (!username || !password || !email) {
    return res.send({ message: "All fields are required" });
}
const exist = users.find(u => u.username === username);
    if (exist) {
    return res.send({ message: "User already exists" });
}
    users.push({ username, password, email });
    // KEEP THIS CODE AFTER ADDING USER TO USERS ARRAY
    saveUsers(users, "data/users.json");
        return res.send({ message: "Registration successful" });

});

app.post("/login", (req, res)  => {
    // body should contain these info username or email, password
    const { username, password } = req.body;
if (!username || !password) {
    return res.send({ message: "Username and password are required" });
}
const user = users.find(u => (u.username === username || u.email === username) && u.password === password);

if (!user) {
    return res.send({ message: "Invalid username or password" });
}
return res.send({ message: "Login successful" });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
