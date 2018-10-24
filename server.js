const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
console.log("required");

hbs.registerPartials(`${__dirname}/views/partials`);
var app = express();
app.set('view engine','hbs')

// app.use((req,res,next) => {
//   res.render('maintainence.hbs');
// });

app.use((req,res,next)=>{
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  fs.appendFile('server.log',`${log}\n`,(err) =>{
    if(err){
      console.log(err);
    }
  });
  console.log(log);
  next();
});
app.use(express.static(`${__dirname}/public`))

app.get('/',(req,res)=>{
  // res.send({
  //   name:'Sabu',
  //   middleName:'Varghese',
  //   lastName:"Thomas"
  // });
  res.render('home.hbs',{
    pagetitle:"Home",
    welcomeMessage:"welcome to my new website",
    currentYear:new Date().getFullYear()
  });
});

app.get('/about',(req,res) => {
  // res.send('<h3>about</h3>');
  res.render('about.hbs',{
    pagetitle:"About",
    currentYear:new Date().getFullYear()
  });
});

app.get('/bad',(req,res) => {
  res.send({
    errorMessage:'some thing really went wrong'
  });
});


app.listen(3000,() =>{
  console.log("server is up on port 3000");
});
