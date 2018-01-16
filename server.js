const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
//criando o servidor
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n', (error) => {
    if(error){
      console.log("Unable to append to server.log");
    }
  });
  next();
});

// app.use((req, res, next) => {
//   res.render('ops.hbs', {
//     pageTitle: 'Oh no Page',
//     sorryMessage: "Ops. This page doesn't exist"
//   });
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

hbs.registerHelper('likes', () => {
  return ['Women', ' Stories', ' Travel'];
});


//configurações
//Um handler, que executa a funçao do segundo argumento, quando a url do primeiro argumento for acessada
app.get('/', (req, res) => {
  // res.send("<h1>Hello, Express!</h1>");
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeText: 'Welcome to my first node website!!'
    //likes: ['Women', ' Stories', ' Travel']
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  })
});

app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    pageTitle: "Portifolio"
  })
});

//metodo get
app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Ops! The page is not here D:'
  });
});

//req -> informacoes do html (headers, body...)
//res -> açoes de reseposta (rever no site)

//Fazendo o servidor escutar
app.listen(port, () => {
  console.log(`Server listening from port ${port}`);
});
