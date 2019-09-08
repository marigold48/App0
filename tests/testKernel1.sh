#!/bin/bash
#testKernel1.sh
cat /dev/null > tests.log


#-------------------------------------------------------------------- kernel1
k1=~/RETO/kernels/kernel1
if [[ -d "$k1" ]]; then
  echo "Dir $k1 OK"  >> tests.log
else
	echo "Error: Dir $k1 NO EXISTE">> tests.log
	cat tests.log
	exit 1
fi

#-------------------------------------------------------------------- kernel1/test
dir=$k1/alfa
if [ -d $dir ]; then
  echo "Dir $dir OK"  >> tests.log
else
	echo "Error: Dir $dir NO EXISTE">> tests.log
	cat tests.log
	exit 1
fi
#-------------------------------------------------------------------- Librerias .js
lista=("Ajax" "Clases" "Random" "Sesion" "Tiempo" "Topol" "Trazo" "Utils" "vApps")
for item in ${lista[@]}
do
	fich=$dir/libK1_$item.js
	if [ -s $fich ]; then
  		echo "Fich $fich OK"  >> tests.log
	else
		echo "Error: Fich $fich NO EXISTE">> tests.log
		cat tests.log
		exit 1
	fi
done



cat <<EOT > /tmp/vgAppTest.js
var vgApp = {
	paramsXHR : {
		url : 'http://localhost', // + window.location.hostname,
		port : 1948,
		base : '/test',
		iam : '',
		eco : null,

	},
	sqlite : {
		base   : '/shell/sqlite',
		userDB : 'usersTest.sqlite',
		sessDB : 'sessTest.sqlite',
		pathDB : 'apps/App0/sqlite/alfa',
		stmtDB : '',
	},
	encript : {
		base   : '/shell/encript',
	}
}
EOT

cat /tmp/vgAppTest.js > $dir/todoJunto.js

#-------------------------------------------------------------------- Concatenar librerias
cat ~/RETO/libs/libBase64.js >> $dir/todoJunto.js
cat $dir/libK1_Utils.js >> $dir/todoJunto.js
cat $dir/libK1_Topol.js >> $dir/todoJunto.js
echo 'var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;' >>  $dir/todoJunto.js
cat $dir/libK1_Ajax.js  >> $dir/todoJunto.js
cat $dir/libK1_Sesion.js  >> $dir/todoJunto.js
cat $dir/libK1_Clases.js >> $dir/todoJunto.js
cat $dir/exports.js  >> $dir/todoJunto.js

#-------------------------------------------------------------------- Creacion BD users 
# para test ajaxCmdShell
rm ../sqlite/alfa/usersTest.sqlite
md5=$(echo "tester.tester" | md5sum)
md5="${md5:0:32}"

cat <<EOT > /tmp/usuarios.sql
	CREATE TABLE users 
	(_id varchar(30),
	id0 number(10),
	usr varchar(20),
	md5 varchar(40) unique,
	rol varchar(10),
	org varchar(10),
	keo varchar(5));

	insert into users values
	('TESTS_Kernel',0,'tester','$md5','TESTS','','ES');
EOT

cat /tmp/usuarios.sql | sqlite3 ../sqlite/alfa/usersTest.sqlite

#-------------------------------------------------------------------- Creacion BD sesiones 
# para test ajaxCmdShell
rm ../sqlite/alfa/sessTest.sqlite
cat <<EOT > /tmp/sesiones.sql
	CREATE TABLE sesiones 
	(sesion_id number(10) unique,
	_id varchar(30),
	id0 number(10),
	org varchar(10),
	url varchar(50),
	keo verchar(5));
EOT

cat /tmp/sesiones.sql | sqlite3 ../sqlite/alfa/sessTest.sqlite

#-------------------------------------------------------------------- Lanzar Mocha tests
cd ~/RETO

cat <<EOT > /tmp/removeDocsML.sql
	db.topols.remove({"meta.iam":{\$eq:"rConjt"}});
	db.topols.remove({"meta.iam":{\$eq:"rLista"}});
	db.topols.remove({"meta.iam":{\$eq:"rArbol"}});
	db.topols.remove({"meta.iam":{\$eq:"rGrafo"}});
	db.topols.remove({"meta.iam":{\$eq:"rMenuML"}});
	db.topols.remove({"meta.iam":{\$eq:"rTextsML"}});
	db.topols.remove({"meta.iam":{\$eq:"rTextML"}});
EOT

cat /tmp/removeDocsML.sql | mongo test

#npm run testK1_Utils
npm run testK1_Topol
npm run testK1_Ajax
#npm run testK1_Sesion
#npm run testK1_Clases
exit 0

