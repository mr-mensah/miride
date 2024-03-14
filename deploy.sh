#! /usr/bin/sh


sudo apt-get update -y && sudo apt-get upgrade -y

sudo apt-get install nginx -y


#regenerate key


#build for production
node ace build --production

#copy .env.example to .env
cp .env.example .env


cd build
npm ci --production

