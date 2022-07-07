const express = require('express');  //to make node easy (express is a node module)
const app=express();  //app is created
const { result } = require('lodash');
const Item=require('./models/item')
const User=require('./models/user')  //to import model named "user"
const bcrypt=require('bcryptjs')      // used for password hashing

//////////////////////////////////////////////////////////////////////
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({extended: true}));
const mongoose = require ('mongoose');  //connecting to database
mongoose.connect('mongodb://localhost:27017/CampUs', {useNewUrlParser:true, useUnifiedTopology:true})
.then((result)=>app.listen(3000))    //first connect then start listening to the port 3000
.catch((err)=>console.log(err));      //catch error if any

var conn = mongoose.connection;
conn.on('connected', function() {
    console.log('database is connected successfully');  //message displayed on succesfull connection
});
conn.on('disconnected',function(){
    console.log('database is disconnected successfully');  //message displayed on dis-connection
})
conn.on('error', console.error.bind(console, 'connection error:')); //message displayed on error connecting
module.exports = conn;  //don't know why???

//////////////////////////////////////////////////////////////////////

app.set('view engine','ejs');           //to render dynamic pages
app.use(express.static('public_assets'));  //Used so that assets can be accessed


////////////////////////////////////////////////////////////
app.get('/',(req, res)=>{
  res.render('index');
});
app.get('/about',(req, res)=>{
  res.render('about');
});
app.get('/profile',(req, res)=>{
  res.render('myprofile');
});
app.get('/login',(req, res)=>{
  res.render('login');
});
app.get('/register',(req, res)=>{
  res.render('register');
});
app.get('/sell',(req, res)=>{
    res.render('sell');
});
//////////////////////////////////////////////////////////

app.post('/sell',(req,res)=>{
  console.log(req.body)
  // res.json({status:OK})

})

app.use(bodyParser.json())

app.post('/register',async(req,res)=>{
  // console.log(req.body)
  const{email, password: PlainTextPassword}=req.body;
  // if(PlainTextPassword.length<5)
  // {
  //   return res.json({
  //     status: 'error',
  //     error: 'Password Too Small'
  //   })
  // }                                     We can put conditions here
  

    const password=await bcrypt.hash(PlainTextPassword,10)   //used to hash the password, second arguement tells something related to how strongly encrypt

    try{
      const response=await User.create({
        email,
        password
      })
      console.log("User created Succesfully", response) 
    } catch(err)
    {
      if(err.code===11000)
      {return res.json({status:'error', error: ' username already used'})}
      else
      throw err
    }
})

 
//to render default 404 page

app.use((req,res)=>
{
  res.render('404');
});


