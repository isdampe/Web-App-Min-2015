#!/bin/bash
proc=`ps aux | grep node | grep http | awk 'BEGIN{FS=" "} {print $2}'`
pkill $proc
gulp sass js
node ./node_modules/http-server/bin/http-server -p 8001 &> /dev/null &
echo "Listening on http://localhost:8001/"
gulp
