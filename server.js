const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 5000;
const emails = require('./data/emails.json');

app.get('/', (req, res) => {    res.send('root route') });

app.use(express.static(path.join(__dirname, 'client/build')));

if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  app.get('*', (req, res) => {    res.sendfile(path.join(__dirname = 'gbmail/build/index.html'));  })
}

app.get('/emails', function(req,res) {
  res.status(200).send(emails);
});

app.get('*', (req, res) => {  res.sendFile(path.join(__dirname+'/gbmail/public/index.html'));})



app.listen(port, (req, res) => {
  console.log( `server listening on port: ${port}`);
})





