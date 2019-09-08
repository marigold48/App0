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
var allK1 = require("/home/pepe/RETO/kernels/kernel1/alfa/todoJunto.js");


var resp = null;
var topolId = null;
var clone_id = null;
var topol = null;

var vgN = {
	nodo1 : new allK1.rNodo('Nodo 1'),
	nodo2 : new allK1.rNodo('Nodo 2'),
	nodo3 : new allK1.rNodo('Nodo 3'),
	nodo4 : new allK1.rNodo('Nodo 4'),
	row1  : new allK1.rNodo('Row 1'),
	row2  : new allK1.rNodo('Row 2'),
	row3  : new allK1.rNodo('Row 3'),
	col1  : new allK1.rNodo('Col 1'),
	col2  : new allK1.rNodo('Col 2'),
	col3  : new allK1.rNodo('Col 3')
}

var vgA ={
	arco12 : new allK1.rArco('Arco 1-2',vgN.nodo1,vgN.nodo2,0),
	arco23 : new allK1.rArco('Arco 2-3',vgN.nodo2,vgN.nodo3,0),
	arco34 : new allK1.rArco('Arco 3-4',vgN.nodo3,vgN.nodo4,0),
	nudo11 : new allK1.rNudo('Nudo 1-1',vgN.row1,vgN.col1,0,0),
	nudo22 : new allK1.rNudo('Nudo 2-2',vgN.row2,vgN.col2,0,0),
	nudo33 : new allK1.rNudo('Nudo 3-3',vgN.row3,vgN.col3,0,0),

	nudo31 : new allK1.rNudo('Nudo 3-1',vgN.row3,vgN.col1,0,0)
}
//------------------------------------------------------------------- Ecos de las llamadas Ajax
function ecoTestPost(xhr){
	resp = JSON.parse(xhr.responseText);
	topolId = resp._id;
	console.log('ecoPost: '+resp.meta.iam);
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
		case 'rMalla' : resp = new allK1.rMalla('x',[]); break;
		case 'rMallaTree' : resp = new allK1.rMallaTree('x',[]); break;
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


//=================================================================== Conjt
//------------------------------------------------------------------- POST Conjt
	describe("Check ajaxPostTopol: Conjt", function() {
		it("Check iam = 'rConjt': ", function() {
			topol = new allK1.rConjt('Conjt 1',[vgN.nodo1,vgN.nodo2,vgN.nodo3]);
			topol.meta.org = 'TESTS';
			var params = allK1.vgApp.paramsXHR;
			params.base = '/test';
			params.eco = ecoTestPost; 
			params.txt = allK1.o2s(topol.clase2ObjDB());
			allK1.ajaxPostTopol(params,'NO');
			assert.equal(resp.meta.iam,'rConjt');
			assert.equal(resp.nodos.length, 3);
		});  
	});  


//------------------------------------------------------------------- PUT Conjt
	describe("Check ajaxPutTopol: Conjt", function() {
		it("Check nodos.length = 4: ", function() {
			topol.addNodo(vgN.nodo4);
			var params = allK1.vgApp.paramsXHR;
			params.base = '/test/';
			params.eco = ecoTestPut; 
			params.txt = allK1.o2s(topol.clase2ObjDB());
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
	describe("Check ajaxPostTopol: Lista", function() {
		it("Check iam = 'rLista': ", function() {
			topol = new allK1.rLista('Lista 1',[vgN.nodo1,vgN.nodo2,vgN.nodo3]);
			topol.meta.org = 'TESTS';
			var params = allK1.vgApp.paramsXHR;
			params.base = '/test';
			params.eco = ecoTestPost; 
			params.txt = allK1.o2s(topol.clase2ObjDB());
			allK1.ajaxPostTopol(params,'NO');
			assert.equal(resp.meta.iam,'rLista');
			assert.equal(resp.nodos.length,3);
		});  
	});  

//------------------------------------------------------------------- PUT Lista
	describe("Check ajaxPutTopol: Lista", function() {
		it("Check nodos.length = 4: ", function() {
			topol.addNodo(vgN.nodo4);
			var params = allK1.vgApp.paramsXHR;
			params.base = '/test/';
			params.eco = ecoTestPut; 
			params.txt = allK1.o2s(topol.clase2ObjDB());
			params.topolId = topolId;
			allK1.ajaxPutTopol(params,'NO');
			assert.equal(resp.meta.iam,'rLista');
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
	describe("Check ajaxPostTopol: Arbol", function() {
		it("Check iam = 'rArbol', nodos = 3: ", function() {
			topol = new allK1.rArbol('Arbol 1',[vgN.nodo1]);
			topol.meta.org = 'TESTS';
			topol.addNodoHijo(vgN.nodo1,vgN.nodo2);
			topol.addNodoHijo(vgN.nodo1,vgN.nodo3);

			var params = allK1.vgApp.paramsXHR;
			params.base = '/test';
			params.eco = ecoTestPost; 
			params.txt = allK1.o2s(topol.clase2ObjDB());
			allK1.ajaxPostTopol(params,'NO');
			assert.equal(resp.meta.iam,'rArbol');
			assert.equal(resp.nodos.length,3);
		});  
	});  

//------------------------------------------------------------------- PUT Arbol
	describe("Check ajaxPutTopol: Arbol", function() {
		it("Check iam = 'rArbol', nodos = 4: ", function() {
			topol.addNodoHijo(vgN.nodo2,vgN.nodo4);
			var params = allK1.vgApp.paramsXHR;
			params.base = '/test/';
			params.eco = ecoTestPut; 
			params.txt = allK1.o2s(topol.clase2ObjDB());
			params.topolId = topolId;
			allK1.ajaxPutTopol(params,'NO');
			assert.equal(resp.nodos.length,4);
		});  
	});  
//------------------------------------------------------------------- GET Arbol
	describe("Check ajaxGet1Topol: Arbol", function() {
		it("Check iam = 'rArbol' && nodos = 4: ", function() {
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

	describe("Check ajaxPostTopol: Grafo", function() {
		it("Check iam = 'rGrafo', nodos = 5: ", function() {
			var todos = [vgN.nodo1,vgN.nodo2,vgN.nodo3,vgA.arco12,vgA.arco23];
			topol = new allK1.rGrafo('Grafo 1',todos);
			var params = allK1.vgApp.paramsXHR;
			params.base = '/test';
			params.eco = ecoTestPost; 
			params.txt = allK1.o2s(topol.clase2ObjDB());
			allK1.ajaxPostTopol(params,'NO');
			assert.equal(resp.meta.iam,'rGrafo');
			assert.equal(resp.nodos.length,5);
		});  
	});  


//------------------------------------------------------------------- PUT Grafo
	describe("Check ajaxPutTopol: Grafo", function() {
		it("Check iam= rGrafo, nodos+arcos = 7", function() {
			topol.addNodo(vgN.nodo4);
			topol.addArco(vgA.arco34);
			var params = allK1.vgApp.paramsXHR;
			params.base = '/test/';
			params.eco = ecoTestPut; 
			params.txt = allK1.o2s(topol.clase2ObjDB());
			params.topolId = topolId;
			allK1.ajaxPutTopol(params,'NO');
			assert.equal(resp.nodos.length,7);
		});  
	});  
//------------------------------------------------------------------- GET Grafo
	describe("Check ajaxGet1Topol: Grafo", function() {
		it("Check iam = 'rGrafo' ,nodos = 4: ", function() {
			var params = allK1.vgApp.paramsXHR;
			params.base = '/test/';
			params.eco = ecoGet1Topol; 
			params.topolId = topolId;
			allK1.ajaxGet1Topol(params,'NO');
			assert.equal(resp.meta.iam,'rGrafo');
			assert.equal(resp.nodos.length,4);//(tras separar nodos de arcos) 
			assert.equal(resp.arcos.length,3);//(tras separar nodos de arcos) 
		});  
	});  

//=================================================================== Malla
//------------------------------------------------------------------- POST Malla


	describe("Check ajaxPostTopol: Malla", function() {
		it("Check iam = 'rMalla', nodos = 9: ", function() {
			vgN.row1.rol = 'ROW'; vgN.row2.rol = 'ROW'; vgN.row3.rol = 'ROW';
			vgN.col1.rol = 'COL'; vgN.col2.rol = 'COL'; vgN.col3.rol = 'COL';
			vgA.nudo11.rol = 'NUDO'; vgA.nudo22.rol = 'NUDO'; vgA.nudo33.rol = 'NUDO';
			var nodos = [vgN.row1,vgN.row2,vgN.row3,vgN.col1,vgN.col2,vgN.col3,vgA.nudo11,vgA.nudo22,vgA.nudo33];

			topol   = new allK1.rMalla('Malla 1',nodos);
			topol.meta.org = 'TESTS';
			var params = allK1.vgApp.paramsXHR;
			params.base = '/test';
			params.eco = ecoTestPost; 
			params.txt = allK1.o2s(topol.clase2ObjDB());
			allK1.ajaxPostTopol(params,'NO');
			assert.equal(resp.meta.iam,'rMalla');
			assert.equal(resp.nodos.length,9);
		});  
	});  

//------------------------------------------------------------------- PUT Malla
	describe("Check ajaxPutTopol: Malla", function() {
		it("Check iam = 'rMalla', nodos = 10: ", function() {
			vgA.nudo31.rol = 'NUDO';
			topol.addNudo(vgA.nudo31)
			var params = allK1.vgApp.paramsXHR;
			params.base = '/test/';
			params.eco = ecoTestPut; 
			params.txt = allK1.o2s(topol.clase2ObjDB());
			params.topolId = topolId;
			allK1.ajaxPutTopol(params,'NO');
			assert.equal(resp.meta.iam,'rMalla');
			assert.equal(resp.nodos.length,10);
		});  
	});  
//------------------------------------------------------------------- GET Malla
	describe("Check ajaxGet1Topol: Malla", function() {
		it("Check iam = 'rMalla' && mrows=3,mcols=3,nudos=4", function() {
			var params = allK1.vgApp.paramsXHR;
			params.base = '/test/';
			params.eco = ecoGet1Topol; 
			params.topolId = topolId;
			allK1.ajaxGet1Topol(params,'NO');
			assert.equal(resp.meta.iam,'rMalla');
			assert.equal(resp.mrows.length,3);
			assert.equal(resp.mcols.length,3);
			assert.equal(resp.nudos.length,4);
		});  
	});  

//=================================================================== MallaTree
//------------------------------------------------------------------- POST MallaTree


	describe("Check ajaxPostTopol: MallaTree", function() {
		it("Check iam = 'rMallaTree', nodos = 13: ", function() {
//			vgN.row1.rol = 'ROW'; vgN.row2.rol = 'ROW'; vgN.row3.rol = 'ROW';
//			vgN.col1.rol = 'COL'; vgN.col2.rol = 'COL'; vgN.col3.rol = 'COL';
//			vgA.nudo11.rol = 'NUDO'; vgA.nudo22.rol = 'NUDO'; vgA.nudo33.rol = 'NUDO';
//			var nodos = [vgN.row1,vgN.row2,vgN.row3,vgN.col1,vgN.col2,vgN.col3,vgA.nudo11,vgA.nudo22,vgA.nudo33];
			var raiz = new allK1.rNodo('MallaT 1');
			topol = new allK1.rMallaTree('MallaT 1',[raiz]);
			topol.meta.org = 'TESTS';
			topol.addNodoRow(vgN.row1);topol.addNodoRow(vgN.row2);topol.addNodoRow(vgN.row3);
			topol.addNodoCol(vgN.col1);topol.addNodoCol(vgN.col2);topol.addNodoCol(vgN.col3);
			topol.addNudo(vgA.nudo11);topol.addNudo(vgA.nudo22);topol.addNudo(vgA.nudo33);

			var params = allK1.vgApp.paramsXHR;
			params.base = '/test';
			params.eco = ecoTestPost; 
			params.txt = allK1.o2s(topol.clase2ObjDB());
			allK1.ajaxPostTopol(params,'NO');
			assert.equal(resp.meta.iam,'rMallaTree');
			assert.equal(resp.nodos.length,13);
		});  
	});  

//------------------------------------------------------------------- PUT MallaTree
	describe("Check ajaxPutTopol: MallaTree", function() {
		it("Check iam = 'rMallaTree', nodos = 14: ", function() {
//			vgA.nudo31.rol = 'NUDO';
			topol.addNudo(vgA.nudo31)
			var params = allK1.vgApp.paramsXHR;
			params.base = '/test/';
			params.eco = ecoTestPut; 
			params.txt = allK1.o2s(topol.clase2ObjDB());
			params.topolId = topolId;
			allK1.ajaxPutTopol(params,'NO');
			assert.equal(resp.meta.iam,'rMallaTree');
			assert.equal(resp.nodos.length,14);
		});  
	});  
//------------------------------------------------------------------- GET MallaTree
	describe("Check ajaxGet1Topol: MallaTree", function() {
		it("Check iam = 'rMallaTree' && mrows=3,mcols=3,nudos=4", function() {
			var params = allK1.vgApp.paramsXHR;
			params.base = '/test/';
			params.eco = ecoGet1Topol; 
			params.topolId = topolId;
			allK1.ajaxGet1Topol(params,'NO');
			assert.equal(resp.meta.iam,'rMallaTree');
			assert.equal(resp.nodos.length,14);
			assert.equal(resp.getRaspa().length,3);
			assert.equal(resp.getNodosRows().length,3);
			assert.equal(resp.getNodosCols().length,3);
			assert.equal(resp.getNudos().length,4);
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
