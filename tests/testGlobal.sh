#!/bin/bash
#testGlobal.sh


cat /dev/null > tests.log

$(global/test_SO.sh)
if [ "$?" = 1 ]
then 
	cat tests.log
	exit 1
fi
cat OKs.log

$(global/test_Dirs.sh)
if [ "$?" = 1 ]
then 
	cat tests.log
	exit 1
fi
cat OKs.log

$(global/test_Fichs.sh)
if [ "$?" = 1 ]
then 
	cat tests.log
	exit 1
fi
cat OKs.log

echo "Espera un poco ..."
$(global/test_Node.sh)
if [ "$?" = 1 ]
then 
	cat tests.log
	exit 1
fi
cat OKs.log

echo "Tests realizados OK"