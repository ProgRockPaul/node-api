//require express
const express = require('express');
//You’re going to use the MongoClient to interact with your database. Note that you also initialize your app as an instance of Express, your framework.
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const db             = require('./config/db');

// app is express
const app            = express();

//The last thing you need to do to get your server up and running is to tell your app to start listening for HTTP requests.

const port = 8000;
//You can specify a port, and start the listening like so:

//Unfortunately, Express can’t process URL encoded forms on its own. But you did install that body-parser package… Now you should see the body as an object in the terminal.
app.use(bodyParser.urlencoded({ extended: true }));

// Then import app routes for use in server.js: Note that since you don’t have a database yet set up, you’re just passing in an empty object.

MongoClient.connect(db.url, (err, database) => {
  if (err) return console.log(err)
  require('./app/routes')(app, database);
  app.listen(port, () => {
    console.log('We are live on ' + port);
  });
})
