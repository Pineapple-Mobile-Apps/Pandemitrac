#!/bin/sh
git pull
docker-compose build --no-cache --force-rm
if [ $# -gt 0 ] ; then
    docker-compose down
fi
docker-compose up -d