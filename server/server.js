// Express Server Entry Point
const express = require('express');
const { loadTasks, loadUsers, saveTasks, saveLoggedInUser, loadLoggedInUser } = require('./utils');
const app = express();
const PORT = 6060;

// Local Database
const tasks = [];
const users = [];

loadTasks(tasks, "data/tasks.json");
loadUsers(users, "data/users.json");
const loggedInUSer = loadLoggedInUser(users, "./loggedInUser.json");

// Middleware
app.use(express.json());

// Routes
app.get('/api/tasks', (req, res) => {
    res.json(tasks)
});

app.get('/api/tasks/search', (req, res) => {
    const { keyword } = req.query
    if (!keyword) {
        return res.json({ error: 'Keyword is required' })
    }
    const result = tasks.filter(task => task.title.includes(keyword) || task.description.includes(keyword))
    res.json(result)
});

// YOU MUST BE LOGGED IN TO DO IT
app.post('/api/tasks', (req, res) => {
    // body should contain these info title, description
    const { title, description, priority } = req.body
    if (!title || !description || !priority) {
        return res.json({
            error: 'Title, description, and priority are required!!'
        })
    }
    const loggedInUser = loadLoggedInUser()
    if (!loggedInUser) {
        return res.status(401).json({
            error: 'You must be logged in to create a task'
        })
    }
    const task = {
        title: "",
        description: "",
        priority: "",
        username: "",
    }
    const newTask = { title, description, priority }
    tasks.push(newTask)
    res.status(201).json(newTask) 
      saveTasks(tasks, "./tasks.json");
 });

app.delete('/api/tasks/', (req, res) => {
     const id = req.query.id;

    if (!id) {
        return res.status(400).json({
             error : 'Id is required' 
        })
    }

    if(!loggedInUser()){
        return res.status(400).json({
            error : "You must be Logged in"
        })
    } 
// find ths task before delete it
    const task = tasks.find(t => t.id === id);
  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

    if (loggedInUser().role !== 'ADMIN' && loggedInUser().username !== username) {
        return res.status(400).json({ 
            error: "You must be admin to delete a task"
        })
    }

    const updateTasks = tasks.filter(t => t.id !== id);
    tasks.push(...updateTasks);
    res.json({
        message : "Task deleted!"
    })
     saveTasks(tasks, "./tasks.json");
});

app.get("/profile", (req, res)  => {
     const { username, email } = req.query
    if (!username && !email) {
        return res.status(400).json({
             error: 'Username or email is required!!' 
        })
    }
    // search for a user
    const user = users.find(user => user.username === username || user.email === email)
    if (!user) {
        return res.status(404).json({ error: 'User not found' })
    }
    res.json(user)
});

 app.delete("/profile", (req, res)  => {
     const { username} = req.query

    if (!username) {
        return res.status(400).json({
            error: 'Username is required!!'
        })
    }

    // make sure that this is the admin
    if (!loggedInUser() || !loggedInUser().role == 'ADMIN') {
        return res.status(400).json({
            error : "You are not admin"
        })
    }

    // make sure that user is exist
    const user = users.findIndex(user => user.username === username)
    if (!user) {
        return res.status(404).json({
            error: 'User not found'
         })
    }

    const updateUsers = users.filter(u => u.username !== username);
    users.push(...updateUsers);
    res.json({
        message : "User deleted!"
    })
    saveUsers(users, "./users.json");
});

app.post("/register", (req, res)  => {
// ROLE
    const { username, email, password, role } = req.body
    if (!username || !email || !password) {
        return res.json({
             error: 'Username, email, and password are required!!' 
        })
    }
    // check if user already exist 
    const exist = users.find(user => user.username === username || user.email === email)
    if (exist) {
        return res.status(404).json({ error: 'User already exists' })
    }
    // add new user  
    const newUser = { username, email, password, role }
    users.push(newUser)
    res.json(newUser) 
    saveUsers(users, "./users.json");
});

app.post("/login", (req, res)  => {
    const { username, email, password } = req.body
    if ((!username && !email) || !password) {
        return res.json({
            error: 'Username, email, and password are required!!' 
        })
    }  
    res.json({ message: 'Login successful' })
    
    const user = users.find(user => user.username === req.body.username || user.email === req.body.username);
    if (!user) {
        return res.status(401).json({ message: "User Not Found" });
    }
    if (user.password !== req.body.password) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    saveLoggedInUser({
        username : user.username,
        email : user.email,
        role : user.role
    });
    res.json({
        message : "Login successful", user
    })
});

app.post("/logout", (req, res) => {
    try {
        fs.writeFileSync('./loggedInUser.json', "null");
        res.json({ message: "Logged out successfully" });
    } 
    catch (error) {
        console.error("Error logging out:", error);
        res.status(500).json({ error: "Failed to logout" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
//mongodb+srv://<db_username>:H8Ljs-3!-DgbqeC@cluster0.ceph86t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0