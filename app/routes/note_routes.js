//In Express, routes are wrapped in a function, which takes the Express instance and a database as arguments.
var ObjectID = require('mongodb').ObjectID;

module.exports = function (app, db) {
  app.get('/notes/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('note').findOne(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send(item);
      }
    })
  });

  app.delete('/note/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id)};
    db.collection('notes').remove(details, (err, item) => {
      if (err) {
        res.send({'error': 'An error has occurred'});
      } else {
        res.send('Note ' + id + ' deleted!');
      }
    });
  });

  app.put('/notes/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    const note = { text: req.body.body, title: req.body.title };
    db.collection('notes').update(details, note, (err, result) => {
      if (err) {
          res.send({'error':'An error has occurred'});
      } else {
          res.send(note);
      }
    });
  });

  app.post('/notes', (req,res) => {
    const note = { text: req.body.body, title: req.body.title };
    db.collection('notes').insert(note, (err, result) => {
      if (err) {
        res.send({ 'error': 'An error has occured'});
      } else {
        res.send(result.ops[0]);
      }
    });
  });
};
