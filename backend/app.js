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
app.use(routes)

// app.use('/spots', require('./routes/spots'));
// app.use('/bookings', require('./routes/bookings'));
// app.use('/users', require('./routes/users'));
// app.use('/reviews', require('./routes/reviews'))
// app.use('/static', require('./routes/images'))

module.exports = app;
