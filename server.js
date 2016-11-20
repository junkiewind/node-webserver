const express = require('express'),
      hbs = require('hbs'),
      fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials/')
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  var now = new Date().toString(),
      log = `---- ${now}: ${req.method} ${req.url}`;
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log');
    }
  });
  console.log();
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public/'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});


app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'NodeJS Course',
    welcomeMsg: 'Welcome to dynamic page',
  });
});
app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'Dynamic content about page',
  });
});
app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Something goes wrong :-('
  });
});


app.listen(port, () => {
  console.log(`****\nNode-server is up on port ${port}\n****`);
});
