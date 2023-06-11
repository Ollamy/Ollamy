# Ollamy

## Start & Build Backend using docker

### Requirements

Before starting the backend you need to install [docker](https://docs.docker.com/engine/install/) on your computer.


### Build steps

To start our project using docker, you must be shure to have to corresponding .env file
You can check the `.env.example` file to check the required variables

When this is done, you can build the backend using this command:
```
docker-compose build backend
```

This will automatically build the following docker services which need to be started before the backend service:
- redisdb (it start our local redis database)
- database (it will start our postgres database)

These services are mandatory to run the backend so check that your environment variables are correctly set.

After building your backend you can directly run it with the `up` command from docker compose:
```
docker-compose up backend
```

This will run a healthcheck to see if our backend is correctly started and make it available for us is it ran properly. Otherwise the backend will not start and you will not use our powerfull api.

### Tips

If you want to build and run the bakend in one command, you can use the `up` command from docker compose with a build flag:
```
docker-compose up --build backend
```

We hope these tips were usefull to you and enjoy our project!