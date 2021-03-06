var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var quadros = require('./routes/quadros');
var promocao = require('./routes/promocao');
var dados = require('./routes/dados');
var quadroselecionado = require('./routes/quadroselecionado');
var canecaselecionada = require('./routes/canecaselecionada');
var favoritos = require('./routes/favoritos');
var carrinho = require('./routes/carrinho');
var canecas = require('./routes/canecas');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/quadros', quadros);
app.use('/promocao', promocao);
app.use('/dados' , dados);
app.use('/quadro/detalhado/', quadroselecionado);
app.use('/caneca/detalhada/', canecaselecionada);
app.use('/favoritos', favoritos);
app.use('/carrinho', carrinho);
app.use('/canecas', canecas);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;