FROM node:18-alpine

WORKDIR /app

RUN apk add --no-cache curl

COPY . .

RUN yarn set version 3.6.0 && echo -e "nodeLinker: node-modules" >> .yarnrc.yml

RUN yarn install
