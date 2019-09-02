/*
Previo al lanzamiento de este test mocha, el script testKernel.sh 
ha concatenado las librerias del kernel en el fichero todoJunto.js
y le ha añadido el fichero exports.js, donde están definidos los 
module.export correspondientes.
Además de ha creado una BD SQLite3, con la tabla users, 
y se le ha insertado un usuario, para testear las llamadas cmd_shell

Antes de probar este módulo debe arrancarse un server node:
$ cd RETO
$ node apps/App0/server/appTests.js
App Tests en http://localhost:1948
Connected to Database

*/

var assert = require("chai").assert;
var allK1 = require("/home/pepe/RETO/kernels/kernel1/test/todoJunto.js");


var resp = null;
var resp2 = null;
var topolId = null;
var clone_id = null;

//------------------------------------------------------------------- Ecos de las llamadas Ajax
function ecoTestPost(xhr){
	resp = JSON.parse(xhr.responseText);
	topolId = resp._id;
}

function ecoTestPut(xhr){
	resp = JSON.parse(xhr.responseText);
}

function ecoGet1Topol(xhr){
	var loTopol = JSON.parse(xhr.responseText);
	switch(loTopol.meta.iam){
		case 'rConjt' : resp = new allK1.rConjt('x',[]); break;
		case 'rLista' : resp = new allK1.rLista('x',[]); break;
		case 'rArbol' : resp = new allK1.rArbol('x',[]); break;
		case 'rGrafo' : resp = new allK1.rGrafo('x',[]); break;
	}
	
	resp.objDB2Clase(loTopol);
}

function ecoDuplicaTopol(xhr){
	resp = JSON.parse(xhr.responseText);
}

function ecoGetMetas(xhr){
	resp = JSON.parse(xhr.responseText);
}

function ecoDeleteTopol(xhr){
	resp = JSON.parse(xhr.responseText);
}

function ecoCmdShell(xhr){
	resp = allK1.csv2filas(xhr.responseText);
}
//------------------------------------------------------------------- TESTS

describe("Lib Ajax: ", function() {


	describe("Check vgApp: ", function() {
	   it("Check valor de paramsXHR.port: ", function() {
			resp   = allK1.vgApp.paramsXHR.port;
			assert.equal(resp, 1948);
	   });  
	});  


  	var nodo1 = new allK1.rNodo('Nodo 1');
  	var nodo2 = new allK1.rNodo('Nodo 2');
  	var nodo3 = new allK1.rNodo('Nodo 3');
  	var nodo4 = new allK1.rNodo('Nodo 4');
//=================================================================== Conjt
//------------------------------------------------------------------- POST Conjt
	var conjt = new allK1.rConjt('Conjt 1',[nodo1,nodo2,nodo3]);
	conjt.meta.org = 'TESTS';
	describe("Check ajaxPostTopol: Conjt", function() {
	   it("Check iam = 'rConjt': ", function() {
			var params = allK1.vgApp.paramsXHR;
			params.base = '/test';
			params.eco = ecoTestPost; 
			params.txt = allK1.o2s(conjt.clase2ObjDB());
			allK1.ajaxPostTopol(params,'NO');
			assert.equal(resp.meta.iam,'rConjt');
	   });  
	});  


//------------------------------------------------------------------- +1 nodo
  	conjt.addNodo(nodo4);
//------------------------------------------------------------------- PUT Conjt
	describe("Check ajaxPutTopol: Conjt", function() {
	   it("Check nodos.length = 4: ", function() {
			var params = allK1.vgApp.paramsXHR;
			params.base = '/test/';
			params.eco = ecoTestPut; 
			params.txt = allK1.o2s(conjt.clase2ObjDB());
			params.topolId = topolId;
			allK1.ajaxPutTopol(params,'NO');
			assert.equal(resp.nodos.length,4);
	   });  
	});  
//------------------------------------------------------------------- GET Conjt
	describe("Check ajaxGet1Topol: Conjt", function() {
	   it("Check iam = 'rConjt' && nodos.length == 4: ", function() {
			var params = allK1.vgApp.paramsXHR;
			params.base = '/test/';
			params.eco = ecoGet1Topol; 
			params.topolId = topolId;
			allK1.ajaxGet1Topol(params,'NO');
			assert.equal(resp.meta.iam,'rConjt');
			assert.equal(resp.nodos.length,4);
	   });  
	});  

//=================================================================== Lista
//------------------------------------------------------------------- POST Lista
	var lista = new allK1.rLista('Lista 1',[nodo1,nodo2,nodo3]);
	lista.meta.org = 'TESTS';
	describe("Check ajaxPostTopol: Lista", function() {
	   it("Check iam = 'rLista': ", function() {
			var params = allK1.vgApp.paramsXHR;
			params.base = '/test';
			params.eco = ecoTestPost; 
			params.txt = allK1.o2s(lista.clase2ObjDB());
			allK1.ajaxPostTopol(params,'NO');
			assert.equal(resp.meta.iam,'rLista');
	   });  
	});  


//------------------------------------------------------------------- +1 nodo
  	lista.addNodo(nodo4);
//------------------------------------------------------------------- PUT Lista
	describe("Check ajaxPutTopol: Lista", function() {
	   it("Check nodos.length = 4: ", function() {
			var params = allK1.vgApp.paramsXHR;
			params.base = '/test/';
			params.eco = ecoTestPut; 
			params.txt = allK1.o2s(lista.clase2ObjDB());
			params.topolId = topolId;
			allK1.ajaxPutTopol(params,'NO');
			assert.equal(resp.nodos.length,4);
	   });  
	});  
//------------------------------------------------------------------- GET Lista
	describe("Check ajaxGet1Topol: Lista", function() {
	   it("Check iam = 'rLista' && nodos.length == 4: ", function() {
			var params = allK1.vgApp.paramsXHR;
			params.base = '/test/';
			params.eco = ecoGet1Topol; 
			params.topolId = topolId;
			allK1.ajaxGet1Topol(params,'NO');
			assert.equal(resp.meta.iam,'rLista');
			assert.equal(resp.nodos.length,4);
	   });  
	});  

//=================================================================== Arbol
//------------------------------------------------------------------- POST Arbol
	var arbol = new allK1.rArbol('Arbol 1',[nodo1]);
	arbol.addNodoHijo(nodo1,nodo2);
	arbol.addNodoHijo(nodo1,nodo3);
	arbol.meta.org = 'TESTS';
	describe("Check ajaxPostTopol: Arbol", function() {
	   it("Check iam = 'rArbol': ", function() {
			var params = allK1.vgApp.paramsXHR;
			params.base = '/test';
			params.eco = ecoTestPost; 
			params.txt = allK1.o2s(arbol.clase2ObjDB());
			allK1.ajaxPostTopol(params,'NO');
			assert.equal(resp.meta.iam,'rArbol');
	   });  
	});  


//------------------------------------------------------------------- +1 nodo
  	arbol.addNodoHijo(nodo2,nodo4);
//------------------------------------------------------------------- PUT Arbol
	describe("Check ajaxPutTopol: Arbol", function() {
	   it("Check nodos.length = 4: ", function() {
			var params = allK1.vgApp.paramsXHR;
			params.base = '/test/';
			params.eco = ecoTestPut; 
			params.txt = allK1.o2s(arbol.clase2ObjDB());
			params.topolId = topolId;
			allK1.ajaxPutTopol(params,'NO');
			assert.equal(resp.nodos.length,4);
	   });  
	});  
//------------------------------------------------------------------- GET Arbol
	describe("Check ajaxGet1Topol: Arbol", function() {
	   it("Check iam = 'rArbol' && nodos.length == 4: ", function() {
			var params = allK1.vgApp.paramsXHR;
			params.base = '/test/';
			params.eco = ecoGet1Topol; 
			params.topolId = topolId;
			allK1.ajaxGet1Topol(params,'NO');
			assert.equal(resp.meta.iam,'rArbol');
			assert.equal(resp.nodos.length,4);
	   });  
	});  

//=================================================================== Grafo
//------------------------------------------------------------------- POST Grafo
	var arco12 = new allK1.rArco('Arco 1-2',nodo1,nodo2,0);
	var arco23 = new allK1.rArco('Arco 1-2',nodo2,nodo3,0);
	var grafo = new allK1.rGrafo('Grafo 1',[nodo1,nodo2,nodo3,arco12,arco23]);
	grafo.meta.org = 'TESTS';
	describe("Check ajaxPostTopol: Grafo", function() {
	   it("Check iam = 'rGrafo': ", function() {
			var params = allK1.vgApp.paramsXHR;
			params.base = '/test';
			params.eco = ecoTestPost; 
			params.txt = allK1.o2s(grafo.clase2ObjDB());
			allK1.ajaxPostTopol(params,'NO');
			assert.equal(resp.meta.iam,'rGrafo');
	   });  
	});  


//------------------------------------------------------------------- +1 nodo
	var arco34 = new allK1.rArco('Arco 3-4',nodo3,nodo4,0);
  	grafo.addNodo(nodo4);
  	grafo.addArco(arco34);
//------------------------------------------------------------------- PUT Grafo
	describe("Check ajaxPutTopol: Grafo", function() {
	   it("Check nodos.length = 7: (4 nodos + 3 arcos)", function() {
			var params = allK1.vgApp.paramsXHR;
			params.base = '/test/';
			params.eco = ecoTestPut; 
			params.txt = allK1.o2s(grafo.clase2ObjDB());
			params.topolId = topolId;
			allK1.ajaxPutTopol(params,'NO');
			assert.equal(resp.nodos.length,7);
	   });  
	});  
//------------------------------------------------------------------- GET Grafo
	describe("Check ajaxGet1Topol: Grafo", function() {
	   it("Check iam = 'rGrafo' && nodos.length == 4: (tras separar nodos de arcos) ", function() {
			var params = allK1.vgApp.paramsXHR;
			params.base = '/test/';
			params.eco = ecoGet1Topol; 
			params.topolId = topolId;
			allK1.ajaxGet1Topol(params,'NO');
			assert.equal(resp.meta.iam,'rGrafo');
			assert.equal(resp.nodos.length,4);
	   });  
	});  


//===================================================================
 //------------------------------------------------------------------ CLONE
 /*
	describe("Check ajaxDuplicaTopol: ", function() {
	   it("Check _id diferente: ", function() {

			var params = allK1.vgApp.paramsXHR;
			params.base = '/test/';
			params.eco = ecoDuplicaTopol;
			params.topolId = topolId;
			allK1.ajaxDuplicaTopol(params,'NO');
			clone_id = resp._id;
			assert.notEqual(clone_id, topolId, 'Los _ids son diferentes');
	   });  
	});
*/
//------------------------------------------------------------------- Get METAS (By Org)
	describe("Check ajaxGetMetasByOrg: ", function() {
	   it("Check meta.org = 'TESTS': ", function() {
			var params = allK1.vgApp.paramsXHR;
			params.base = '/metasByOrg/';
			params.eco = ecoGetMetas; 
			params.iam = 'rConjt';
			params.org = 'TESTS';
			allK1.ajaxGetMetasByOrg(params,'NO');
			assert.equal(resp[0].meta.org,'TESTS');
	   });  
	});

//-------------------------------------------------------------------- DELETE
	describe("Check ajaxDeleteTopol: ", function() {
	   it("Check resp.message:'BORRADO': ", function() {

			var params = allK1.vgApp.paramsXHR;
			params.base = '/test/';
			params.eco = ecoDeleteTopol;
			params.topolId = topolId;
			allK1.ajaxDeleteTopol(params,'NO');
			assert.equal(resp.message,'BORRADO');
	   });  
	});

//------------------------------------------------------------------- CMD SHELL

	describe("Check ajaxCmdShell: ", function() {
	   it("Check usuario tester: ", function() {

			var stmt = 'select * from users;';
			var stmtB64 = allK1.Base64.encode(stmt);
			var body = {
				id0 : 1234567,
				path : allK1.vgApp.sqlite.pathDB,
				db   : allK1.vgApp.sqlite.userDB,
				stmt : stmtB64
			}
			var params = allK1.vgApp.paramsXHR;
			params.base = allK1.vgApp.sqlite.base;
			params.eco = ecoCmdShell;
			allK1.ajaxCmdShell(params,body,'NO');
			assert.equal(resp[0].usr,'tester');
	   });  
	});



});
