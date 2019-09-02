'use strict';

module.exports = function(app) {
	var testsCtrl = require('./controller');

//------------------------------------------------------------------- Index - Route
	app.route('/')
		.get(testsCtrl.get_Raiz);

//------------------------------------------------------------------- Shell Scripts
	app.route('/shell/oracle/')
		.post(testsCtrl.SQL_Oracle);

	app.route('/shell/sqlite/')
		.post(testsCtrl.SQL_SQLite);

	app.route('/shell/encript/')
		.post(testsCtrl.encriptPWD);

//------------------------------------------------------------------- MongoDB
	app.route('/test') 
		.get(testsCtrl.findAll)
		.post(testsCtrl.add);

	app.route('/metas/:iam') 
		.get(testsCtrl.findMetas);

	app.route('/metasByOrg/:iam/:org') 
		.get(testsCtrl.findMetasByOrg);

	app.route('/test/:id') 
		.get(testsCtrl.findById)
		.put(testsCtrl.update)
		.delete(testsCtrl.delete);

	app.route('/clone/:id') 
		.delete(testsCtrl.duplica);

};





