const express = require('express'); //load express
const hbs = require('hbs');//load handlebars
var app = express(); //setting var app equal to return from calling fn express
const fs = require('fs');

hbs.registerPartials(__dirname + '/views/partials'); //arg is directory //to use partials for removing code redundancy

app.set('view engine', 'hbs'); //tells express what view engine we would like to use,
//also make a default directory called views. Inside that we can make template for our about page! with extention .hbs(handlebars)
app.use(express.static(__dirname + '/public')); //2nd way __dirname for telling its absolute directory

//express middleware, allows u to add on to the existing functionality that express doesn't have.
//app.use() is used to register a middleware, like on line 9 we taught express how to read from a directory.
//app.use(fn) takes a fn as an argument

app.use((req, res, next) => { //next tells express whe ur middleware work is done
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  fs.appendFile('server.log', `${log} '\n'`, (error) => {
    if(error)
      console.log('Unable to record log and append it to server.log');
  });
  next(); //very important otherwise next steps would not proceed. //called after something async like DB call.
});

/*app.use((req, res, next) => { // further middlewares would not be rendered because there is no next.
  res.render('maintenance.hbs', { //this will show on all handlers.
    currentYear: new Date().getFullYear()
  });
})*/

app.get('/', (req, res) => {
  //One way
  /*res.send({
    name: 'Aditi',
    age: 21,
    likes: ['Singing', 'Cooking'],
  });*/
  //other way
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    currentDate: new Date(),
    currentYear: new Date().getFullYear(),
    note: 'Welcome to our website'
  })
}); //url and fn to run. Fn has 2 args, request{headers,body,path} and response{what data u send back, status codes}.

app.get('/bad', (req, res) => {
  res.send({
    errorMsg: 'Unable to fulfil the request'
  });
});

app.get('/about', (req,res) => { //3rd way
  res.render('about.hbs', { //res.render(page to be rendered, props if any)
    pageTitle: 'About Page',
    currentYear: new Date().getFullYear()
  });
});



app.listen(3000, () => { //2nd arg is optional
  console.log('Server is up on port 3000');
});
