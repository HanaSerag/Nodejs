const {app}=require('./index');
const{register,registerUser}=require('./controllers/register')
const {findUser,login}=require('./controllers/login');
const { logout } = require('./controllers/logout');
const {AddStudent,AddStudentPost,GETStudents,GETUsers,DeleteUser}=require('./controllers/addStudent')
const {DeleteStudent}=require('./controllers/deleteStudent')
const {EditStudent,EditStudentPost}=require('./controllers/editStudent')

                                        

app.get('/login',login);
app.post('/login',findUser);

app.get('/register',register);
app.post('/register',registerUser);

app.get('/logout',logout)


app.get('/add-student',AddStudent)
app.post('/add-student',AddStudentPost)

app.get('/students',GETStudents)
app.get('/users',GETUsers)

app.post('/delete-user/:id',DeleteUser)

app.get('/editStudent/:id',editStudent)
app.post('/editStudent/:id',editStudentPost)
app.post('/deleteStudent/:id',deleteStudent)