FROM ollamy-base

WORKDIR /app/packages/service-backend

COPY . .

RUN yarn install

RUN yarn prisma generate

RUN yarn build

CMD yarn start:prod
