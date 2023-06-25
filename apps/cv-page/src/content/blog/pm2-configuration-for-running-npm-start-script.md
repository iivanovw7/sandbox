---
title: PM2 configuration for running "npm start" script
description: Few options of running react application with pm2
date: 2022-07-07T18:49:56.394Z
author: iivanovw7
layout: ../../templates/BasePost.astro
tags:
    - js
    - node
    - react
    - pm2
draft: true
---

#### 1. Running via configuration file

File `application.config.json` should be kept in root application directory:

```bash
    {
        "apps": [{
            "name": "my-app",
            "script": "npm",
            "args" : "start"
        }]
    }
```

<br />

Application should be executed via command:

```bash
    pm2 start application.config.json
```

<br />

#### 2. Execute application with command line:

```bash
    pm2 start npm --no-automation --name {application name} -- run {script name}
```

<br />

#### 3. Create shell script for running application:

```bash
    #!/bin/bash
    cd /path/to/project
    npm start
```

<br />

Then run sh script via command line:

```bash
    pm2 start start.sh --name { application name }
```

<br />
