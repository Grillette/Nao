#!/bin/bash

# MAINTAINER Johan Maurel

command -v node >/dev/null 2>&1 || { echo >&2 "Install NodeJs v6.0.0 or later"; exit 1; }
cd client
npm install
npm run dist
cp -R dist/assets ../
cp dist/index.html ../
cp src/qimessaging.js ../assets/
npm start