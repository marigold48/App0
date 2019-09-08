var assert = require("chai").assert;
var allK1 = require("/home/pepe/RETO/kernels/kernel1/alfa/todoJunto.js");

describe("Lib Topol: ", function() {
//------------------------------------------------------------------- Nodo

	describe("Check rNodo: ", function() {
		it("Check new rNodo: ", function() {
			result   = new allK1.rNodo('Nodo');
			assert.equal(result.iam, 'rNodo');
		});  
	});  

//------------------------------------------------------------------- Arco
	describe("Check rArco: ", function() {
		it("Check new rArco: ", function() {
			result   = new allK1.rArco('Arco',nodo1,nodo2,0);
			assert.equal(result.getId0Real(), nodo1.id0);
		});  
	});  

// Al comprobar rConjt, etc, comprobamos rTopol

  	var nodo1 = new allK1.rNodo('Nodo 1');
  	var nodo2 = new allK1.rNodo('Nodo 2');
  	var nodo3 = new allK1.rNodo('Nodo 3');

//------------------------------------------------------------------- Conjt
	describe("Check rConjt: ", function() {
		it("Check new rConjt: ", function() {
			result   = new allK1.rConjt('Conjt 1',[nodo1,nodo2,nodo3]);
			var nodoX = result.getNodoByIx(2);
			assert.equal(nodoX.tag, 'Nodo 3');
		});  
	});  

//------------------------------------------------------------------- Lista
	describe("Check rLista: ", function() {
		it("Check new rLista: ", function() {
			result   = new allK1.rLista('Lista 1',[nodo1,nodo2,nodo3]);
			var nodoX = result.getNodoByIx(2);
			assert.equal(nodoX.num, 2);
		});  
	});  
//------------------------------------------------------------------- Arbol
	describe("Check rArbol: ", function() {
		it("Check new rArbol: ", function() {
			result   = new allK1.rArbol('Arbol 1',[nodo1]);
			result.addNodoHijo(nodo1,nodo2);
			result.addNodoHijo(nodo2,nodo3);
			var nodoX = result.getNodoById(nodo3.id0);
			assert.equal(nodoX.id1, nodo2.id0);
		});  
	});  
//------------------------------------------------------------------- Grafo
	var arco12 = new allK1.rArco('Arco 1-2',nodo1,nodo2,0);
	var arco23 = new allK1.rArco('Arco 2-3',nodo2,nodo3,0);

	describe("Check rGrafo: ", function() {
		it("Check new rGrafo: ", function() {
			result   = new allK1.rGrafo('Grafo 1',[nodo1,nodo2,nodo3,arco12,arco23]);
			assert.equal(result.nodos.length, 3);
			assert.equal(result.arcos.length, 2);
		});  
	});  
//------------------------------------------------------------------- Malla
  	var row1 = new allK1.rNodo('Row 1'); row1.rol="ROW";
  	var row2 = new allK1.rNodo('Row 2'); row2.rol="ROW";
  	var row3 = new allK1.rNodo('Row 3'); row3.rol="ROW";

  	var col1 = new allK1.rNodo('Col 1'); col1.rol="COL";
  	var col2 = new allK1.rNodo('Col 2'); col2.rol="COL";
  	var col3 = new allK1.rNodo('Col 3'); col3.rol="COL";

	var nudo11 = new allK1.rNudo('Nudo 1-1',row1,col1,0,0); nudo11.rol = 'NUDO';
	var nudo22 = new allK1.rNudo('Nudo 2-2',row2,col2,0,0); nudo22.rol = 'NUDO';
	var nudo33 = new allK1.rNudo('Nudo 3-3',row3,col3,0,0); nudo33.rol = 'NUDO';

	var nodos = [row1,row2,row3,col1,col2,col3,nudo11,nudo22,nudo33];

	describe("Check rMalla: ", function() {
		it("Check new rMalla: ", function() {
			result   = new allK1.rMalla('Malla 1',nodos);
			assert.equal(result.mrows.length, 3);
			assert.equal(result.mcols.length, 3);
			assert.equal(result.nudos.length, 3);
		});  
	});  


//------------------------------------------------------------------- MallaTree
  	var raiz = new allK1.rNodo('MallaT 1');

	describe("Check rMallaTree: ", function() {
		it("Check new rMallaTree: ", function() {
			result   = new allK1.rMallaTree('MallaT 1',[raiz]);
			
			result.addNodoRow(row1);
			result.addNodoRow(row2);
			result.addNodoRow(row3);

			result.addNodoCol(col1);
			result.addNodoCol(col2);
			result.addNodoCol(col3);

			result.addNudo(nudo11);
			result.addNudo(nudo22);
			result.addNudo(nudo33);

			assert.equal(result.getNudos().length, 3);
			assert.equal(result.getNodosRows().length, 3);
			assert.equal(result.getNodosCols().length, 3);
		});  
	});  

});
