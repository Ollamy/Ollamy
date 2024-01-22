FROM ollamy-base

WORKDIR /app/packages/service-maker

COPY ./package.json .

RUN yarn install

COPY . .

CMD yarn build

CMD yarn preview --host