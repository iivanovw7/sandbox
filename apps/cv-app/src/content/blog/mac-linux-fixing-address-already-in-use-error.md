---
title: Mac/Linux fixing "address already in use" error.
description: Find and kill application listening to certain PORT.
date: 2022-02-09T19:45:17.219Z
author: iivanovw7
layout: ../../templates/BasePost.astro
tags:
    - linux
    - mac
draft: true
---

`First` is to find out the process ID.

```bash
    sudo lsof -n -i:<port number>;
```

<br />

Same for Mac:

```bash
    lsof -i tcp:<port no>;
```

<br />

`Second` is to kill application by ID.

```bash
    kill -9 <PID>;
```

<br />
