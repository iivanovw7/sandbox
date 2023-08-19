---
title: Docker usage in Frontend project
description: How to add a possibility of building and running Frontend project
    in Docker container
date: 2022-10-05T18:54:36.464Z
author: iivanovw7
layout: ../../templates/BasePost.astro
tags:
    - docker
    - node
    - npm
    - pm2
draft: true
---

#### Example project uses NPM and Node 12 (assuming Docker environment has already been setup)

<br />
1. Add `Dockerfile` in root directory, does not have to add any file extension
<br />

```bash
    # Dockerfile
    FROM node:12 # pulls node 12 image
    WORKDIR /app # sets main work directory all commands will be running
    COPY . /app # copy all project files to app directory
    RUN npm install # run installation script
    RUN npm run build # building application
    RUN npm install pm2 -g # installing pm2 in container
    EXPOSE 1338 # opens ports to be available in hosting system
    CMD ["pm2-runtime", "./server/server.js"] # tells pm2 to run node js file

```

<br />

2. For `Ubuntu 18.04`, I added simple bash `scripts.sh` in the project root path, to do all needed operations:
   <br />

```bash
#!/bin/bash
    # Set up port
    PORT=1338
    echo "Stop containers by tcp:${PORT} assigned..."
    # Lists containers assigned to PORT and greps target ID
    ID=$(\
        docker container ls --format="{{.ID}}\t{{.Ports}}" |\
        grep ${PORT} |\
        awk '{print $1}')
    echo "Found Container ID: ${ID}"
    echo "Stopping and removing it"
    # Stops and removes target container
    docker container stop ${ID} && docker container rm ${ID}
    echo "Remove unused docker images and container"
    docker system prune
    echo "Building docker image..."
    docker build -t web-to-print .
    echo "Finished..."
    echo "Executing docker container..."
    docker container run --rm -d -p ${PORT}:${PORT}
      # runs docker container on custom port
      # Options:
      # --rm - removes image after shut down
      # -d runs image on background
      # -p setting up port

```

<br />

#### Slightly more complicated with NPM and Node 12 (assuming Docker environment has already been setup)

Running separate NPM scripts in one container
<br />

1. Add `process.yml` in root directory:

```bash
  apps:
    - script : 'npm'
      args   : 'run prod'
      name   : 'prod'
      cwd    : './server'
    - script : 'npm'
      args   : 'run prod:dist'
      name   : 'prod:dist'
      cwd    : './server'
```

<br />

2. Refactoring `Dockerfile` to make it operate multiple ports and also run unit tests with stylelint:

```bash
    # Dockerfile
    # Pulling image
    FROM node:12

    # Set up work dir
    WORKDIR /app

    # Copy application data
    COPY . /app

    # Install global depencies, project depencies and pm2 globally,
    RUN npm install
    RUN npm install pm2 -g
    RUN npm run install:all

    # Running all tests (regenerating snapshots)
    RUN cd client && npm run test -- -u
    RUN cd client && npm run stylelint
    RUN cd server && npm run test -- -u

    # Building client app
    RUN npm run build

    # Exposing application ports
    EXPOSE 8439
    EXPOSE 4789

    # Executing
    CMD ["pm2-runtime", "./process.yml"]
```

<br />

3. Refactoring scripts.sh to make it operate with multiple ports:

```bash
    #!/bin/bash

    #---File configuration---
    PORTS=(8439 4789) # Ports list to be exposed
    CONTAINER_NAME='work-book'
    #------------------------

    PORTS_STRING=''
    PORTS_CONFIG=''

    for PORT in "${PORTS[@]}"; do
        PORTS_STRING+=" ${PORT}";
        PORTS_CONFIG+=" -p ${PORT}:${PORT}";
    done

    # Stops and removes docker container by ID
    # Param: $1 - ID
    removeDockerContainerById () {
        if [[ "$1" ]]
        then
        # Removes container
        echo "Found Container ID: ${1}"
        echo "Stopping and removing it"
        docker container stop ${1} && docker container rm ${1}
        fi
        echo "No containers found!"
        return 0
    }

    # Finds docker container by PORT assigned
    # Param: $1 - PORT number
    findContainerByPortNumber () {
        if [[ "$1" ]]
        echo "Searching containers by port: $1"
        then
        # Lists containers and finds one which is listening application port
        ID=$(\
        docker container ls --format="{{.ID}}\t{{.Ports}}" |\
        grep ${1} |\
        awk '{print $1}')
        removeDockerContainerById "${ID}"
        fi
        return 0
    }

    # Pulls image and builds new container
    createNewContainer () {
        # Cleans all useless containers and images
        echo "Remove unused docker images and container"
        docker system prune
        echo "Building docker image..."

        # Builds new container
        docker build -t ${CONTAINER_NAME} .

        # Runs container with parameters
        echo "Finished..."
        echo "Executing docker container with exposed ports: ${PORTS_STRING}..."
        docker container run -d --rm ${PORTS_CONFIG} ${CONTAINER_NAME}
    }

    createUserDialog() {
        # Asks if we need to remove containers listening to application ports
        read -p "Should we find and remove any containers listening to: ${PORTS_STRING} ? [y/N] " -n 1 -r
        echo    # moving to a new line

        if [[ $REPLY =~ ^[Yy]$ ]]
        then

        # Run through ports array
        for PORT in "${PORTS[@]}"; do
        findContainerByPortNumber ${PORT};
        done
        createNewContainer
        else
        createNewContainer
        fi
        return 0
    }

    # Run application
    createUserDialog

```

<br />

4. To run script file:

```bash
    sudo chmod +x ./scripts.sh
    ./scripts.sh
```
