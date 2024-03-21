#! /usr/bin/bash

git pull
npm run build
cp .env build/.env
cd build
npm ci --omit="dev"
cd ..
pm2 restart miride-app