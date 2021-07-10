#!/usr/bin/bash

pkg update && pkg upgrade -y
pkg install git nodejs -y
pkg install ffmpeg -y

npm install
npm start

echo "Done installing all package require, run the script : npm start"
