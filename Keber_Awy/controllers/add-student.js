const fs = require('fs');
const path = require('path');

const AddStudent = (req, res) => {
    res.render('add-student', { search: "ex", message: "enter the new student" });
}

const AddStudentPost = (req, res) => {
    const { firstname, lastname, age, email, states, course } = req.body;

    if (!firstname || !lastname || !age || !email || !states || !course) {
        return res.render('add-student', { message: "All fields are required" });
    }

    fs.writeFileSync('../data/students.json', JSON.stringify({ firstname, lastname, age, email, states, course }));

    res.render('add-student', { message: "Student added successfully" });
}


const GETStudents = (req, res) => {
    const studentsPath = path.join(__dirname, '../data/students.json');

    const students = JSON.parse(fs.readFileSync(studentsPath, 'utf-8'));
    console.log(students);

    let student = students.map((item => ({ firstname: item.firstname, lastname: item.lastname, email: item.email})))
    res.render('view-students', { students });
}


const GETUsers = (req, res) => {
    const usersPath = path.join(__dirname, '../data/users.json');

    const users = JSON.parse(fs.readFileSync(usersPath, 'utf-8'));

    let user = users.map((item => ({ username: item.username, fullName: item.fullName, email: item.email })))
    res.render('manage-users', { users, user });
}


const DeleteUser = (req, res) => {
    const { id } = req.params;
    if (!id){
        return res.send("ID is required");
    } 

    const users = JSON.parse(fs.readFileSync('../data/users.json'));

    const user = users.find(user => user.id === parseInt(id));

    if (!user) { 
        return res.json("User not found"); 
    }

    const updatedUsers = users.filter(user => user.id !== id);

    fs.writeFileSync('../data/users.json', JSON.stringify(updatedUsers));
    res.redirect('/users');
}


module.exports = { 
  AddStudent,
  AddStudentPost,
  GETStudents,
  GETUsers,
  DeleteUser 
};
