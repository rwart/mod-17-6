
var express = require('express');
var app = express();

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.static('assets'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/auth/google', function (req, res) {
  res.render('loginform');
});

function authenticateUser(email, password) {
  const users = [
    { email: 'samuel@samba', password: 'qwertyqwerty' },
    { email: 'eli@samba', password: 'password1' },
  ];

  for (let i = 0; i < users.length; i++) {
    if (users[i].email === email && users[i].password === password) {
      return true;
    }
  }

  return false;
}

app.post('/userlogin', function (req, res) {

  if (authenticateUser(req.body.email, req.body.password)) {
    res.render('userlogin', { email: req.body.email });
  } else {
    res.render('loginform', {
      message: 'Login unsuccessful, please try again', });
  }
});

app.use(function (req, res, next) {
  var msg = 'Request endpoint not supported: method: ' +
   req.method + ' url: ' + req.originalUrl;

  res.status(404).send(msg);
  console.log(msg);
});

var server = app.listen(3000, 'localhost', function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('server URL http://' + host + ':' + port);
});
