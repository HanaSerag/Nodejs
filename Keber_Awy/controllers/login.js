const users=require('../data/users.json')


const login=(req,res)=>{
  console.log("Hello User!!");
  res.render('login',{message:"Please login!"});
}

const findUser=(req,res)=>{
  console.log("hello");
  const { username,password } = req.body;
  if( !username || !password ){
    return res.send("the username & password are required");
  } 
  const user=users.find( u=>u.username === username && u.password === password);

  if(!user){
    res.send("invalid username or password"); 
    return res.render('login');
  }

  res.send("login successful!!");
  res.render('index.ejs',{user:user})
}


module.exports={ login,findUser }