---
title: Installing multiple Java JDKs on Ubuntu
description: Manual way of installing custom JDK version on Ubuntu
date: 2023-04-27T18:10:47.923Z
author: iivanovw7
layout: ../../templates/BasePost.astro
tags:
    - linux
    - ubuntu
    - java
    - jdk
draft: true
---

1. Download [.tar.gz](https://www.oracle.com/technetwork/java/javase/downloads/index.html) compressed file.
   <br />

2. Then uncompress it (64 bit)

```bash
  tar -xvf jdk-8-linux-x64.tar.gz
```

<br />

3. Check file name and copy new version to `/usr/lib` folder

```bash
  sudo mkdir -p /usr/lib/jvm
  sudo mv ./jdk1.8.0 /usr/lib/jvm/
```

<br />

4. Set up JDK as default

```bash
  sudo update-alternatives --install "/usr/bin/java" "java" "/usr/lib/jvm/jdk1.8.0/bin/java" 1
  sudo update-alternatives --install "/usr/bin/javac" "javac" "/usr/lib/jvm/jdk1.8.0/bin/javac" 1
  sudo update-alternatives --install "/usr/bin/javaws" "javaws" "/usr/lib/jvm/jdk1.8.0/bin/javaws" 1
```

<br />

5. Then correct the file ownership and the permissions

```bash
  sudo chmod a+x /usr/bin/java
  sudo chmod a+x /usr/bin/javac
  sudo chmod a+x /usr/bin/javaws
  sudo chown -R root:root /usr/lib/jvm/jdk1.8.0
```

<br />

6. Then run commands below and select appropriate version.

```bash
  sudo update-alternatives --config java
  sudo update-alternatives --config javac
```

<br />
