#!/bin/sh
git pull
docker-compose build
if [ $# -gt 0 ] ; then
    docker-compose down
fi
docker-compose up -d