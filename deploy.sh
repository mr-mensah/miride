#! /usr/bin/bash

git pull
npm run build
cp .env build/.env
cd miride
npm ci --omit="dev"
cd ..
pm2 restart miride-app