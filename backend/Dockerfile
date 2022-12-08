FROM node:alpine3.16

WORKDIR /app

COPY . .

RUN yarn install && yarn prisma migrate dev && yarn build

CMD ["yarn", "start:prod"]
