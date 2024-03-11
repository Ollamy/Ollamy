# Ollamy base docker image

---

This image has been made to build all the packages needed by ollamy services.

## How does it work:

- First you need to go to the `base` folder:

```sh
cd dockerfiles/base
```

- run the `build.sh` file. Before running it you may need to understand the purpose of this file.

### Build.sh file explanations
- We copy the .env, package.json and yarn.lock files and store them in a dedicated folder called dockerfiles/base:

```sh
cp ../../package.json ../../yarn.lock ../../.env .
```

- We find all the existing folders in **package** excluding the node modules. They will created with the image. Then, we create the image with the given name (here __ollamy-base__):

``` sh
find ../../packages -type d -name "node_modules" -prune -o -type f
-name "package.json" -print -exec sh -c 'mkdir -p "packages/$(basename $(dirname "{}"))" && cp "{}" "packages/$(basename $(dirname "{}"))/package.json"' \;
docker build -t "$IMAGE_NAME" . --network=host || exit $?
```

- Finally, we remove the files that we copied previously to keep the folder clean

```sh
rm -rf packages package.json yarn.lock .env
```



### Use the build file

- Now, you can run the scipt using this command:

```sh
bash build.sh
```

> :warning: In case of **Permission Denied** error messages, you can run it using sudo:

```sh
sudo bash build.sh
```

After building the ollamy base image using the build.sh file, we can use it in our services containers.
