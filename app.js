const express = require('express');
const cors = require ('cors');
const router = require('./routes');
const {basicHadlerError,errorHandler} = require('./middlewares/errorHandler.mw');
const app = express();

app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use('/api', router);

app.use(errorHandler,basicHadlerError);

module.exports = app;