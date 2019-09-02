var assert = require("chai").assert;
var utils = require("/home/pepe/RETO/kernels/kernel1/test/todoJunto.js");
describe("Lib Utils: ", function() {
	describe("Check initCaps: ", function() {
	   it("Check valor de hola mundo: ", function() {
	    	result   = utils.fn('hola mundo');
	   	assert.equal(result, 'Hola Mundo');
	   });  
	});  

	describe("Check vgk: ", function() {
	   it("Check valor de GRANO: ", function() {
	    	result   = utils.vgk.GRANO;
	   	assert.equal(result, 300000);
	   });  
	});  

	describe("Check csv2obj: ", function() {
	   it("Check valor de 'uno|dos|tres' con '1|2|3': ", function() {
	    	result   = utils.csv2obj('uno|dos|tres','1|2|3');
	   	assert.equal(result.uno, 1);
	   	assert.equal(result.dos, 2);
	   	assert.equal(result.tres, 3);
	   });  
	});  

	describe("Check csv2filas: ", function() {
		var csv = 'uno|dos|tres'+'\n'+'1|2|3'+'\n'+'1|2|3'+'\n \n[error:0]\n ';
	   it("Check valor de 'uno|dos|tres' con 2 filas de '1|2|3': ", function() {
	    	result   = utils.csv2filas(csv);
	   	assert.equal(result[1].uno, 1);
	   	assert.equal(result[1].dos, 2);
	   	assert.equal(result[1].tres, 3);
	   });  
	});  
	describe("Check vgApp: ", function() {
	   it("Check valor de paramsXHR.port: ", function() {
	    	result   = utils.vgApp.paramsXHR.port;
	   	assert.equal(result, 1948);
	   });  
	});  


});
