#!/usr/bin/env bash

IMAGE_NAME=ollamy-base

cp ../../package.json ../../.env .
mkdir -p packages
cp -r ../../packages/util-design-system ./packages/util-design-system
find ../../packages -type d -prune -o -type f -name "package.json" -print -exec sh -c 'mkdir -p "packages/$(basename $(dirname "{}"))" && cp "{}" "packages/$(basename $(dirname "{}"))/package.json"' \;
docker build -t "$IMAGE_NAME" . --network=host || exit $?
echo "Built image $IMAGE_NAME"
rm -rf packages package.json yarn.lock .env