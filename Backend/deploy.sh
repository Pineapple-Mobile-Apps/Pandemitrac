#!/bin/sh
git pull
docker-compose down
docker-compose build --no-cache --force-rm
docker-compose up -d