const fs = require('fs');

/**
 * Load users from JSON file
 */
function loadUsers(users, dbFile) {
    try {
        if (!fs.existsSync(dbFile)) return;
        const data = fs.readFileSync(dbFile, 'utf8');
        if (!data.trim()) return;
        const parsedData = JSON.parse(data);
        users.push(...parsedData);
    } catch (err) {
        console.error(`Error loading users from ${dbFile}:`, err);
    }
}

/**
 * Load tasks from JSON file
 */
function loadTasks(tasks, dbFile) {
    try {
        if (!fs.existsSync(dbFile)) return;
        const data = fs.readFileSync(dbFile, 'utf8');
        if (!data.trim()) return;
        const parsedData = JSON.parse(data);
        tasks.push(...parsedData);
    } catch (err) {
        console.error(`Error loading tasks from ${dbFile}:`, err);
    }
}

/**
 * Save tasks to JSON file
 */
function saveTasks(tasks, dbFile) {
    const data = JSON.stringify(tasks, null, 2);
    try {
        fs.writeFileSync(dbFile, data, 'utf8');
    } catch (err) {
        console.error(`Error saving tasks to ${dbFile}:`, err);
    }
}

/**
 * Save users to JSON file
 */
function saveUsers(users, dbFile) {
    const data = JSON.stringify(users, null, 2);
    try {
        fs.writeFileSync(dbFile, data, 'utf8');
    } catch (err) {
        console.error(`Error saving users to ${dbFile}:`, err);
    }
}

/**
 * Save logged in user
 */
function saveLoggedInUser(user) {
    try {
        fs.writeFileSync('data/loggedInUser.json', JSON.stringify(user, null, 2));
    }
    catch (error) {
        console.error("Error saving logged in user : ", error);
    }
}

/**
 * Load logged in user
 */
function loadLoggedInUser() {
    try {
        if (!fs.existsSync('data/loggedInUser.json')) return null;
        const data = fs.readFileSync('data/loggedInUser.json', 'utf-8');
        if (!data.trim()) return null;
        return JSON.parse(data);
    }
    catch (error) {
        console.error("Error loading logged in user : ", error);
        return null;
    }
}

module.exports = {
    loadUsers,
    loadTasks,
    saveTasks,
    saveUsers,
    saveLoggedInUser,
    loadLoggedInUser
};
