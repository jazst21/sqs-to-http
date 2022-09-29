#!/bin/sh

#[ ! -f .env ] && cp sample.env .env

zip -r function.zip index.js node_modules

aws lambda update-function-code \
--function-name s3sqsToHttp \
--zip-file fileb://function.zip

rm function.zip
