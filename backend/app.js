require('express-async-errors');
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser')
const { environment } = require('./config');
const isProduction = environment === 'production';
const routes = require('./routes')

const app = express();

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());

// Security Middleware

if (!isProduction) {
    app.use(cors());
}
app.use(helmet.crossOriginResourcePolicy({
    policy: 'cross-origin'
})
);

app.use(
    csurf({
        cookie: {
            secure: isProduction,
            sameSite: isProduction && 'Lax',
            httpOnly: true
        }
    })
)
app.use('*spot-images*', (req, res, next) => {
    req.imageType = 'spot'
    next()
})
app.use('*review-images*', (req, res, next) => {
    req.imageType = 'review'
    next()
})
app.use(routes)

app.use((_req, _res, next) => {
    const err = new Error("The requested resource couldn't be found.");
    err.title = "Resource Not Found";
    err.errors = { message: "The requested resource couldn't be found." };
    err.status = 404;
    next(err);
});

const { ValidationError } = require('sequelize');

// Process sequelize errors
app.use((err, _req, _res, next) => {
    // check if error is a Sequelize error:
    if (err instanceof ValidationError) {
        let errors = {};
        for (let error of err.errors) {
            errors[error.path] = error.message;
        }
        err.title = 'Validation error';
        err.errors = errors;
    }
    next(err);
});

app.use((err, _req, res, _next) => {
    if (err.title === 'Validation error') err.status = 400
    res.status(err.status || 500);
    console.error(err);
    if (isProduction) res.json({
        message: err.title ? err.title : err.message,
        errors: err.errors
    })
    else res.json({
        // title: err.title || 'Server Error',
        message: err.title ? err.title : err.message,
        errors: err.errors,
        stack: err.stack
    });
})

module.exports = app;
