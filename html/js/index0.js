
import utils from '/k1/libK1_Utils.js'
import sess from '/k1/libK1_Sesion.js'

import {vgApp,goPag} from '/js/app0_VGlob.js'

window.vgApp = vgApp;
window.goPag = goPag;

function modSwitch(ok,tipo){
	if (!ok){
		utils.vgk.appLogin.error = true;
		return;
	}
	console.log(ok+':'+tipo);
	switch(utils.vgk.user.rol){
		case 'SYSTEM' :
			window.location = 'system.html?idSess='+utils.vgk.sesion_id;
			break;
		case 'ADMIN' :
			window.location = 'dashboard0.html?idSess='+utils.vgk.sesion_id;
			break;
		case 'TESTS' :
			window.location = 'testLogin.html';
			break;
		default:
			vgk.appLogin.noRol = true;
	}
}

function init_Login(){
	var navg = navigator;
	console.log (navg.userAgent);
	console.log (navg.appName+':'+navg.appVersion+':'+navg.appCodeName+':'+navg.platform)
	console.log('Java?: '+navg.javaEnabled());

	utils.vgk.appLogin = new Vue({
		el: '#divLogin',
		data: {
			user  : '', 
			pwd   : '',
			error : false,
			noRol : false
		},
		methods : {
			validaUsrPwd: function(){
				sess.validaUser(this.user,this.pwd,modSwitch);
				} // en libK1_Sesion.mjs
			}
	}) 
	utils.r$('user').focus();

}

window.onload = init_Login; 
//window.init = init_Login;
//export default {init_Login}
