'use strict';

const express = require('express');
const serveStatic = require('serve-static');
const signer = require('./s3-signer');

const app = express();

app.use(serveStatic('public', {'index': 'index.html'}));
app.use('/s3', signer);

app.get('/hello', function (req, res) {
  res.send('Hello World');
});

const server = app.listen(3000, function () {
  const host = server.address().address
  const port = server.address().port

  console.log("!!!Example app listening at http://%s:%s", host, port)
});