var assert = require("chai").assert;

var topol = require("/home/pepe/RETO/kernels/kernel1/test/todoJunto.js");
describe("Lib Topol: ", function() {
	describe("Check rNodo: ", function() {
	   it("Check new rNodo: ", function() {
	    	result   = new topol.rNodo('Nodo');
	   	assert.equal(result.iam, 'rNodo');
	   });  
	});  

	describe("Check rArco: ", function() {
	   it("Check new rArco: ", function() {
	    	result   = new topol.rArco('Arco',nodo1,nodo2,0);
	   	assert.equal(result.getId0Real(), nodo1.id0);
	   });  
	});  

// Al comprobar rConjt, etc, comprobamos rTopol

  	var nodo1 = new topol.rNodo('Nodo 1');
  	var nodo2 = new topol.rNodo('Nodo 2');
  	var nodo3 = new topol.rNodo('Nodo 3');

	describe("Check rConjt: ", function() {
	   it("Check new rConjt: ", function() {
	    	result   = new topol.rConjt('Conjt 1',[nodo1,nodo2,nodo3]);
	    	var nodoX = result.getNodoByIx(2);
	   	assert.equal(nodoX.tag, 'Nodo 3');
	   });  
	});  

	describe("Check rLista: ", function() {
	   it("Check new rLista: ", function() {
	    	result   = new topol.rLista('Lista 1',[nodo1,nodo2,nodo3]);
	    	var nodoX = result.getNodoByIx(2);
	   	assert.equal(nodoX.num, 2);
	   });  
	});  

	describe("Check rArbol: ", function() {
	   it("Check new rArbol: ", function() {
	    	result   = new topol.rArbol('Arbol 1',[nodo1]);
	    	result.addNodoHijo(nodo1,nodo2);
	    	result.addNodoHijo(nodo2,nodo3);
	    	var nodoX = result.getNodoById(nodo3.id0);
	   	assert.equal(nodoX.id1, nodo2.id0);
	   });  
	});  

	var arco12 = new topol.rArco('Arco 1-2',nodo1,nodo2,0);
	var arco23 = new topol.rArco('Arco 2-3',nodo2,nodo3,0);

	describe("Check rGrafo: ", function() {
	   it("Check new rGrafo: ", function() {
	    	result   = new topol.rGrafo('Grafo 1',[nodo1,nodo2,nodo3,arco12,arco23]);
	   	assert.equal(result.nodos.length, 3);
	   	assert.equal(result.arcos.length, 2);
	   });  
	});  


});
