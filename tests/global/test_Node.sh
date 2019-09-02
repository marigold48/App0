#!/bin/bash
#test_SO.sh

version=`node --version`
if [[ $version  =~ "v8" ]] 
then 
	echo "Node version $version" >> tests.log
else 
	echo "Node version NO v8.x.x : $version"  >> tests.log
	exit 1
fi

version=`npm --version`
if [[ $version  =~ "3." ]] 
then 
	echo "NPM version $version" >> tests.log
else 
	echo "NPM version NO 3.x.x : $version"  >> tests.log
	exit 1
fi

if [ -s ~/RETO/package.json ]
then 
   echo " package.json OK " >> tests.log
else
   	echo " package.json NO EXISTE " >> tests.log
	echo "Acción: $ npm init -y" >> tests.log
	exit 1
fi

if [ -d ~/RETO/node_modules ]; then
  echo "Dir RETO/node_modules OK"  >> tests.log
else
	echo "No existe directorio ~/RETO/modules">> tests.log
	echo "Acción : $ npm install">> tests.log
	exit 1
fi


pkg_express=`npm list --depth 0| grep express`
if [[ $pkg_express  =~ "express" ]] 
then 
	echo "Package express: ${pkg_express:4}" >> tests.log
else 
	echo "Package express NO INSTALADO" >> tests.log
	echo "Acción: $ npm install express --save" >> tests.log
	exit 1
fi

pkg_mongoose=`npm list --depth 0| grep mongoose`
if [[ $pkg_mongoose  =~ "mongoose" ]] 
then 
	echo "Package mongoose: ${pkg_mongoose:4}" >> tests.log
else 
	echo "Package mongoose NO INSTALADO" >> tests.log
	echo "Acción: $ npm install mongoose --save" >> tests.log
	exit 1
fi

pkg_body_parser=`npm list --depth 0| grep body-parser`
if [[ $pkg_body_parser  =~ "body-parser" ]] 
then 
	echo "Package body-parser: ${pkg_body_parser:4}" >> tests.log
else 
	echo "Package body-parser NO INSTALADO" >> tests.log
	echo "Acción: $ npm install body-parser --save" >> tests.log
	exit 1
fi

pkg_method_override=`npm list --depth 0| grep method-override`
if [[ $pkg_method_override  =~ "method-override" ]] 
then 
	echo "Package method-override: ${pkg_method_override:4}" >> tests.log
else 
	echo "Package method-override NO INSTALADO" >> tests.log
	echo "Acción: $ npm install method-override --save" >> tests.log
	exit 1
fi

pkg_mocha=`npm list --depth 0| grep mocha`
if [[ $pkg_mocha  =~ "mocha" ]] 
then 
	echo "Package mocha: ${pkg_mocha:4}" >> tests.log
else 
	echo "Package mocha NO INSTALADO" >> tests.log
	echo "Acción: $ npm install mocha --save" >> tests.log
	exit 1
fi

pkg_chai=`npm list --depth 0| grep chai`
if [[ $pkg_chai  =~ "chai" ]] 
then 
	echo "Package chai: ${pkg_chai:4}" >> tests.log
else 
	echo "Package chai NO INSTALADO" >> tests.log
	echo "Acción: $ npm install chai --save" >> tests.log
	exit 1
fi

pkg_sinon=`npm list --depth 0| grep sinon`
if [[ $pkg_sinon  =~ "sinon" ]] 
then 
	echo "Package sinon: ${pkg_chai:4}" >> tests.log
else 
	echo "Package sinon NO INSTALADO" >> tests.log
	echo "Acción: $ npm install sinon --save" >> tests.log
	exit 1
fi

echo "Tests Node OK" > OKs.log