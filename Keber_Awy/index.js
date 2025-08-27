const express=require('express');
const app=express();
const path=require('path');


app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname,'public')));


connectDB();
mongoose.connection.once('connected', () => {
      console.log('Connected to MongoDB');
      app.listen(process.env.port, () => {
          console.log(`Server is running on http://localhost:${process.env.port}`);
      });
});

module.exports={app};