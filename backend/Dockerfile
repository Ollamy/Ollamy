FROM node:alpine3.16

WORKDIR /app

COPY . .

RUN yarn install && yarn build

CMD ["yarn", "start:prod"]
