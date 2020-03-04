
import utils  from '/k1/libK1_Utils.js'
import sess   from '/k1/libK1_Sesion.js'
import vapps  from '/k1/libK1_vApps.js'
import idioma from '/k1/libK1_Idioma.js'

import {rKeos,rLang,rNodoClase,rTxtML,rTagML,rUsuario} from '/k1/libK1_Clases.js'

import {vgApp,goPag} from '/js/app0_VGlob.js'

window.vgApp = vgApp;
window.goPag = goPag;

window.rKeos = rKeos;
window.rLang = rLang;
window.rNodoClase = rNodoClase;
window.rTxtML = rTxtML;
window.rTagML = rTagML;
window.rUsuario = rUsuario;

window.cierraSesion = sess.cierraSesion;
window.cambiaKeoUser = sess.cambiaKeoUser;
window.cambiaPwdUser = sess.cambiaPwdUser;
//------------------------------------------------------------------- Init
function sesionDashboard0OK(xhr){
//	setAppMenu(vgk.sesion.keo);
//	setAppPag(vgk.sesion.keo,vgk.sesion.org);
	idioma.ajaxGetMenuPag('Dashboard');
	idioma.ajaxGetTextPag('Dashboard');
	idioma.ajaxGetClasesPag('Dashboard');
	setTimeout(function(){actualizaH1(); },500);
}




function initDashboard0(){
	vapps.initAppsGlobal();
	sess.validaSesion('usrMenu', sesionDashboard0OK); // libK1_sesion.js
}

window.onload = initDashboard0; 

