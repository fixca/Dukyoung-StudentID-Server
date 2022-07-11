const express = require('express');
const logger = require('morgan');
require('dotenv').config();

const app = express();

const apiRouter = require('./routers');

app.use(express.json());
app.use(logger("dev"));
app.use(express.urlencoded({ extended: false }));

app.disable('x-powered-by');

app.use('/api', apiRouter);

app.use((req, res) => {
    res.send(`Access Denied.\n잘못된 접근 입니다.`);
});

app.listen(8080, (req, res) => {
    console.log("Listening on Port 8080!");
});