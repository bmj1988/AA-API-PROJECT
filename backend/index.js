require('express-async-errors');
require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());

app.use('/spots', require('./routes/spots'));
app.use('/bookings', require('./routes/bookings'));
app.use('/users', require('./routes/users'));
app.use('/reviews', require('./routes/reviews'))
app.use('/static', require('./routes/images'))

app.listen(process.env.PORT, () => console.log('Awaiting Command . . . PORT ', process.env.PORT))
