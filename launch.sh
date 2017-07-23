#!/bin/bash
node ./node_modules/http-server/bin/http-server -p 8001 &> /dev/null &
echo "Listening on http://localhost:8001/"
gulp
