// test_Sesion.js
/*
Previo al lanzamiento de este test mocha, el script testKernel.sh 
ha concatenado las librerias del kernel en el fichero todoJunto.js
y le ha añadido el fichero exports.js, donde están definidos los 
module.export correspondientes.
Además de ha creado una BD SQLite3, con la tabla users, 
y se le ha insertado un usuario, para testear las llamadas cmd_shell

Antes de probar este módulo debe arrancarse un server node:
$ cd RETO
$ node tests/server/appTests.js
App Tests en http://localhost:1948
Connected to Database
*/

var assert = require("chai").assert;
var allK1 = require("/home/pepe/RETO/kernels/kernel1/alfa/todoJunto.js");

var resp = null;

//------------------------------------------------------------------- Ecos de las llamadas Ajax
function ecoValidaUser(ok,tipo){
	if (ok)resp = 'OK_'+tipo;
	else resp = 'ERROR_'+tipo;
}

//------------------------------------------------------------------- TESTS

describe("Lib Sesion ", function() {

 //------------------------------------------------------------------- Valida User
	describe("Check validaUser: ", function() {
	   it("Check OK SESION ", function() {
			allK1.validaUser('tester','tester',ecoValidaUser,'NO');
			assert.equal(resp,'OK_SESION');
	   });  
	});  
})
