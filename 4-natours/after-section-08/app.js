const express = require('express');


const morgan = require('morgan');//just a middleware

const tourRouter = require('./routes/tourRoutes');

//the specific controllers associated with each routes are present in 
//the controller folder

const userRouter = require('./routes/userRoutes');

const app = express();

// 1) MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
//middleware for parsing json
app.use(express.static(`${__dirname}/public`));
//it is used for hosting static data

app.use((req, res, next) => {
  console.log('Hello from the middleware 👋');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 3) ROUTES

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
