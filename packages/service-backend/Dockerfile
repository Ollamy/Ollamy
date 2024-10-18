FROM ollamy-base

WORKDIR /app/packages/service-backend

RUN ln -s /app/.env .env

COPY ./package.json .

RUN yarn install

COPY ./prisma ./prisma

RUN yarn prisma generate

COPY . .

RUN yarn build

CMD yarn start:prod
