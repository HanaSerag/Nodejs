const editStudent=(req,res)=>{
    res.render('edit-student', {message:"Editing Student" })
}


const editStudentPost=(req,res)=>{
    const { id } = req.params
    const { firstname,lastname, age, email,states,course  } = req.body

    if (!id || !firstname || !lastname || !age || !email || !states || !course) {
        return res.status(400).send("All fields are required")
    }

    const filePath = path.join(__dirname, '../data/students.json')
    const students = JSON.parse(fs.readFileSync(filePath, 'utf-8'))

    const studentIndex = students.findIndex(student => student.id === parseInt(id));
    if (studentIndex === -1) {
        return res.status(404).send("Student not found");
    }

    students[studentIndex] = { id: parseInt(id), firstname, lastname, age, email, states, course };
    fs.writeFileSync(filePath, JSON.stringify(students, null, 2));

    res.redirect('/students');
}
module.exports={editStudent,editStudentPost}

