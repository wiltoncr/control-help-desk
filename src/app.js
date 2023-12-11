const express = require('express');
const { router } = require('./router');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(express.static(path.resolve(__dirname,'..', 'public')));

app.use(router);

module.exports = {
  app,
};
