FROM node:alpine3.16

WORKDIR /app

RUN apk add openjdk11 curl bash

COPY . .

RUN yarn install && yarn prisma generate && yarn build

CMD ["yarn", "start:prod"]
