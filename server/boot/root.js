'use strict';

module.exports = function(server) {
  // Install a `/` route that returns server status
  var router = server.loopback.Router();
  router.get('/', server.loopback.status());
  router.post('/create/model', function(req, res) {
    var db = server.dataSources.db;
    var newModel = req.body;
    var model = db.createModel(newModel['name'], newModel['fields']);
    server.model(model);
    res.send('Model created!');
  });
  server.use(router);
};
