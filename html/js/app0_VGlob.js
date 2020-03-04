
/*
sed -i 's/alfaApp0/betaGrafo/g' mod_cuaderno.js 
const Fase = 'ALFA',

function getPathsDB(piam,peco){
	var params = null;

	switch(Fase){
		case 'ALFA':
			params = {
				base : '/alfaApp0/',
				meta : '/metas/',
				org  : '/metasByOrg/'
				md5  : '/shell/encript/',
				sql  : '/shell/sqlite',
				iam  : piam,
				eco  : peco
				url  : 'http://' + window.location.hostname,
				port : 3102,
				user : 'usersAlfa.sqlite',
				sess : 'sessAlfa.sqlite',
				path : 'apps/App0/sqlite/alfa',
				repo : 'repoAlfaApp0.sqlite',
			}
			break;

		case 'BETA':
			params = {
				base : '/betaApp0/',
				meta : '/metas/',
				org  : '/metasByOrg/'
				md5  : '/shell/encript/',
				sql  : '/shell/sqlite',
				iam  : piam,
				eco  : peco
				url  : 'http://' + window.location.hostname,
				port : 3202,
				user : 'usersBeta.sqlite',
				sess : 'sessBeta.sqlite',
				path : 'apps/App0/sqlite/beta',
				repo : 'repoBetaApp0.sqlite',
			}
			break;
	}

	return params;
}
*/

import {vgk}  from '/k1/libK1_Utils.js'

export var vgApp = {
	paramsXHR : {
		fase : 'alfa',
		url : 'http://' + window.location.host,
//		port : 3102,
		base : '/datos',
		otro : '',
		iam : '',
		eco : null
	},
	sqlite : {
		base   : '/shell/sqlite',
		userDB : 'usersApp0.sqlite',
		sessDB : 'sessApp0.sqlite',
		pathDB : 'apps/App0/sqlite',
		repoDB : 'repoApp0.sqlite',
		notaDB : 'notasApp0.sqlite',
		stmtDB : '',
	},
	encript : {
		base   : '/shell/encript',
	}
}

export function goPag(pag,_id){
	if (vgk.params) var idSess = vgk.params.idSess;
	switch (pag){

		case 'TOPOLS':
			window.location = 'topologias.html?idSess='+idSess;
			break;
	}
}

