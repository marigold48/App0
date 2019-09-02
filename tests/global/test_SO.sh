#!/bin/bash
#test_SO.sh

let so=`uname -a | grep Linux | wc -l`
if [ $so = 1 ] 
then 
	echo "SO Linux OK" >> tests.log
else 
	echo "SO NO Linux"  >> tests.log
	exit 1
fi

echo "Tests SO OK" > OKs.log