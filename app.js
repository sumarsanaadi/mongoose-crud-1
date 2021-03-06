const createError = require('http-errors')
const express = require('express')
const logger = require('morgan')
const mongoose = require('mongoose')

const indexRouter = require('./routes/index')
const booksRouter = require('./routes/books')
const customersRouter = require('./routes/customers')
const transactionRouter = require('./routes/transactions')
const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter)
app.use('/api/books', booksRouter)
app.use('/api/customers', customersRouter)
app.use('/api/transactions', transactionRouter)

mongoose.connect("mongodb://localhost:27017/mongoose_crud", { useNewUrlParser: true })
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected to db')
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
