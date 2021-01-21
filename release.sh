#! /bin/bash
#
npm run pack

rm -rf release

mkdir release

cp -r ./dist/ release/dist/

cp -r ./src/ release/src/

version=$(grep "version" package.json | head -n 1 | awk -F'"' '{print $4}')

s=`cat <<EOF
{
    "name": "rong-ui2",
    "version": "$version",
    "description": "A Vue.js 2.0 UI Toolkit for Web.",
    "author": "rong-ui2",
    "keywords": [
        "rong-ui2"
    ],
    "bugs": {
        "url": "https://github.com/rong360/rong-ui2/issues"
    },
    "homepage": "https://github.com/rong360/rong-ui2",
    "repository": {
        "type": "git",
        "url": "git+https://github.com/rong360/rong-ui2.git"
    },
    "main": "dist/js/rong-ui.js",
    "dependencies": {
        "async-validator": "^3.3.0",
        "better-picker": "^1.1.3"
    },
    "contributors": [
      {
        "name": "List of Acorn contributors. Updated before every release."
      },{
        "name": "zyx"
      }
    ],
    "engines": {
      "node": ">= 4.0.0",
      "npm": ">= 3.0.0"
    },
    "browserslist": [
        "> 1%",
        "last 2 versions",
        "last 10 Chrome versions",
        "last 5 Firefox versions",
        "Safari >= 6",
        "not ie <= 8"
    ],
    "license": "MIT"
}

EOF`
echo "$s" > release/package.json


cp README.md release/README.md

cd release

npm publish




