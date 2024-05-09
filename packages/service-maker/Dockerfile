FROM ollamy-base

WORKDIR /app/packages/service-maker

COPY ./package.json .

RUN yarn install

COPY . .

ARG FRONTEND_PORT
ENV FRONTEND_PORT=${FRONTEND_PORT}

RUN yarn dev --port $FRONTEND_PORT --host