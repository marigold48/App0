var assert = require("chai").assert;
var allK1 = require("/home/pepe/RETO/kernels/kernel1/test/todoJunto.js");

	var resp = null;
	var menuML = null;
	var textoML = null;
	var topolId = null;

	function ecoTestPost(xhr){
		var respTxt = xhr.responseText;
		var loTopol = JSON.parse(respTxt);
		topolId = loTopol._id;
		menuML = new allK1.rMenuML("",[]);
		menuML.objDB2Clase(loTopol);
	}

	function ecoTestCarga(xhr){
		var respTxt = xhr.responseText;
		var loTopol = JSON.parse(respTxt);
		menuML = new allK1.rMenuML("",[]);
		menuML.objDB2Clase(loTopol);
	}

	describe("Check Clases K1: ", function() {
	   it("Check rMeta: ", function() {
	   	var meta = new allK1.rMeta('Tests');
	   	assert.equal(meta.tag, 'Tests');
	   	assert.equal(meta.iam, 'Desconocida');
	   	assert.equal(meta.org, 'No Org');
	   });  

		it("Check Crea Menu ML: ", function() {
	    	var opc1 = new allK1.rOpcML('Opcion 1','opt1'); 
	    	var opc2 = new allK1.rOpcML('Opcion 2','opt2');
	    	var opc3 = new allK1.rOpcML('Opcion 3','opt3');
	    	var opc4 = new allK1.rOpcML('Opcion 4','opt4');
	    	menuML   = new allK1.rMenuML('TESTS',[opc1,opc2,opc3,opc4]);
	   	assert.equal(menuML.meta.iam, 'rMenuML');
	   	assert.equal(menuML.nodos.length,4);
	   });

		it("Check graba MenuML: ", function() {
			var params = allK1.vgApp.paramsXHR;
			params.base = '/test';
			params.eco = ecoTestPost; 
			params.iam = 'rMenuML';
			params.txt = allK1.o2s(menuML.clase2ObjDB());
			allK1.ajaxPostTopol(params,'NO');
			assert.equal(menuML.meta.tag,'TESTS');
			assert.equal(menuML.nodos.length,4);
	   });  

		it("Check carga MenuML: ", function() {
			var params = allK1.vgApp.paramsXHR;
			params.base = '/test/';
			params.eco = ecoTestCarga;
			params.topolId = topolId;

			allK1.ajaxGet1Topol(params,'NO');
			assert.equal(menuML.meta.tag,'TESTS');
			assert.equal(menuML.nodos.length,4);
	   });  

		it("Check Crea Texto ML: ", function() {
	    	var txt1 = new allK1.rTxtML('Texto 1','txt1'); 
	    	txt1.obj["ES"] = 'Me fui a vivir al bosque, porque quería vivir deliberadamente solo,';
	    	var txt2 = new allK1.rTxtML('Texto 2','txt2');
	    	txt2.obj["ES"] = 'para hacer frente a los hechos esenciales de la vida,';
	    	var txt3 = new allK1.rTxtML('Texto 3','txt3');
	    	txt3.obj["ES"] = 'y ver si así podía aprender ';
	    	var txt4 = new allK1.rTxtML('Texto 4','txt4');
	    	txt4.obj["ES"] = 'lo que tenía que enseñar.';

	    	textoML   = new allK1.rTextsML('TESTS',[txt1,txt2,txt3,txt4]);
		  	assert.equal(textoML.meta.iam, 'rTextsML');
		  	assert.equal(textoML.nodos.length,4);
	   });

		it("Check graba Texto ML: ", function() {
			var params = allK1.vgApp.paramsXHR;
			params.base = '/test';
			params.eco = ecoTestPost; 
			params.iam = 'rTextsML';
			params.txt = allK1.o2s(textoML.clase2ObjDB());
			allK1.ajaxPostTopol(params,'NO');
	   	assert.equal(textoML.meta.iam, 'rTextsML');
			assert.equal(menuML.nodos.length,4);
	   });  

		it("Check carga Texto ML: ", function() {
			var params = allK1.vgApp.paramsXHR;
			params.base = '/test/';
			params.eco = ecoTestCarga;
			params.topolId = topolId;

			allK1.ajaxGet1Topol(params,'NO');
	   	assert.equal(textoML.meta.iam, 'rTextsML');
			assert.equal(menuML.nodos.length,4);
	   });  

	});  

