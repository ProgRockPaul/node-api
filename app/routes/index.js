//You can then import your note_routes function to your index.js:

const noteRoutes = require('./note_routes');

module.exports = function(app, db) {
  noteRoutes(app, db);
};
