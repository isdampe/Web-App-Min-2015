#!/bin/bash
function killServer() {
	proc=`ps aux | grep node | grep http | awk 'BEGIN{FS=" "} {print $2}'`
	if [ -z "$proc" ]
	then
		echo "No dev http-server is active. Ignoring."
	else
		echo "Closing dev http-server"
		kill $proc
	fi
}

killServer
node ./node_modules/http-server/bin/http-server -p 8001 &> /dev/null &
echo "Listening on http://localhost:8001/"
gulp sass js
gulp
killServer
