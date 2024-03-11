FROM ollamy-base

WORKDIR /app/packages/service-maker

COPY ./package.json .

RUN yarn install

COPY . .

RUN yarn build

CMD yarn preview --port 5173 --host