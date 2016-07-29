'use strict';

module.exports = function(server) {
  // Install a `/` route that returns server status
  var router = server.loopback.Router();
  router.get('/', server.loopback.status());
  router.post('/create/model', function(req, res) {
    var db = server.dataSources.db;
    var newModel = req.body;
    try {
      var model = db.createModel(newModel['name'], newModel['fields']);
      server.model(model);
      res.send('Model created!');
    } catch (err) {
      res.status(500).send('Error on create new model. ' +
      	'Body format should be ' +
      	'{"name": "MyModel", "fields": {"name": "string"}}');
    }
  });
  server.use(router);
};
