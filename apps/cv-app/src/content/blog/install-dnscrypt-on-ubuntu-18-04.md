---
title: Install Dnscrypt on Ubuntu 18.04
description: Find and kill application listening to certain PORT.
date: 2023-04-27T18:46:27.743Z
author: iivanovw7
layout: ../../templates/BasePost.astro
tags:
    - dns
    - linux
    - ubuntu
draft: true
---

Check DNS leak [Here](https://dnsleaktest.com) <br />
If there are any problems [solution](https://github.com/dnscrypt)

Purge:

```bash
    sudo apt purge dnscrypt-proxy
```

<br />

Install:

```bash
    sudo apt update
    sudo apt install dnscrypt-proxy
```

<br />

Now you'll need to change your DNS server to 127.0.2.1. <br />
Restart network services:

```bash
    sudo systemctl restart NetworkManager
```
