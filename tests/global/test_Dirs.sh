#!/bin/bash
#test_Dirs.sh

if [ -d ~/RETO ]; then
  echo "Dir RETO OK"  >> tests.log
else
	echo "No existe directorio ~/RETO">> tests.log
	exit 1
fi

if [ -d ~/RETO/apps ]; then
  echo "Dir RETO/apps OK"  >> tests.log
else
	echo "No existe directorio ~/RETO/apps">> tests.log
	exit 1
fi

if [ -d ~/RETO/cgibin ]; then
  echo "Dir RETO/cgibin OK"  >> tests.log
else
	echo "No existe directorio ~/RETO/cgibin">> tests.log
	exit 1
fi

if [ -d ~/RETO/fonts ]; then
  echo "Dir RETO/fonts OK"  >> tests.log
else
	echo "No existe directorio ~/RETO/fonts">> tests.log
	exit 1
fi

if [ -d ~/RETO/kernels ]; then
  echo "Dir RETO/kernels OK"  >> tests.log
else
	echo "No existe directorio ~/RETO/kernels">> tests.log
	exit 1
fi

if [ -d ~/RETO/kernels/kernel1 ]; then
  echo "Dir RETO/kernels/kernel1 OK"  >> tests.log
else
	echo "No existe directorio ~/RETO/kernels/kernel1">> tests.log
	exit 1
fi

if [ -d ~/RETO/kernels/kernel1/alfa ]; then
  echo "Dir RETO/kernels/kernel1/alfa OK"  >> tests.log
else
	echo "No existe directorio ~/RETO/kernels/kernel1/alfa">> tests.log
	exit 1
fi



if [ -d ~/RETO/libs ]; then
  echo "Dir RETO/libs OK"  >> tests.log
else
	echo "No existe directorio ~/RETO/libs">> tests.log
	exit 1
fi


if [ -d ~/RETO/apps/App0/tests ]; then
  echo "Dir RETO/App0/apps/test OK"  >> tests.log
else
	echo "No existe directorio ~/RETO/apps/App0/tests">> tests.log
	exit 1
fi

echo "Tests Dirs OK" > OKs.log