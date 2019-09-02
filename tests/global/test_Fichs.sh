#!/bin/bash
#test_Fichs.sh

#cgibin:
#	base64.sh
#	k1EncriptPWD.cgi
#	k1GetQryORCL.cgi
#	k1GetQryLite.cgi

dir=~/RETO/cgibin

fich=$dir/base64.sh
if [ -x $fich ]; then
  	echo "Fich $fich OK"  >> tests.log
else
	echo "Error: Fich $fich NO EXISTE (o no es ejecutable)">> tests.log
	cat tests.log
	exit 1
fi

fich=$dir/k1GetQryLite.cgi
if [ -x $fich ]; then
  	echo "Fich $fich OK"  >> tests.log
else
	echo "Error: Fich $fich NO EXISTE (o no es ejecutable)">> tests.log
	cat tests.log
	exit 1
fi

fich=$dir/k1EncriptPWD.cgi
if [ -x $fich ]; then
  	echo "Fich $fich OK"  >> tests.log
else
	echo "Error: Fich $fich NO EXISTE (o no es ejecutable)">> tests.log
	cat tests.log
	exit 1
fi

dir=~/RETO/libs
fich=$dir/libBase64.js
if [ -s $fich ]; then
  	echo "Fich $fich OK"  >> tests.log
else
	echo "Error: Fich $fich NO EXISTE">> tests.log
	cat tests.log
	exit 1
fi

echo "Tests Fichs OK" > OKs.log