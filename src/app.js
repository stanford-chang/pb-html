const express = require('express');
const bodyParser = require('body-parser');
const bot = require('./bot');

const app = express();

app.set('view engine', 'jade');
app.set('views', __dirname + '/views');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.render('index');
});

app.post('/', function(req, res, next) {
  const postData = { input: req.body.input };

  if (req.body.clientName) {
    postData.client_name = req.body.clientName;
    bot.talk(postData, botResponseHandler);
  } else {
    bot.atalk(postData, botResponseHandler);
  }

  function botResponseHandler(err, botResponse) {
    if (err) {
      return next(err);
    }

    const resp = { text: botResponse.responses.join(' ') };

    if (botResponse.client_name) {
      resp.clientName = botResponse.client_name;
    }

    res.send(resp);
  }
});

app.use(function(req, res, next) {
  const err = new Error();
  err.status = 404;
  next(err);
});

if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
