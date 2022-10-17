const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes/TodoRoute');
const app = express();
const DB_URI = "mongodb://127.0.0.1:27017/TodoDB";
// const DB_URI = process.env.MONGODB_SERVER;
mongoose.connect(DB_URI);
mongoose.connection.once('open', (err) => {
    if (!err) {
        console.log('Connected to DB');
    }
});
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use('/api/v1', routes);


const port = 8000 | process.env.PORT;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});