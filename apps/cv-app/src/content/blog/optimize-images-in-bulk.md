---
title: Optimize images in bulk
description: Recursive image files optimization with optipng and jpegoptim
date: 2023-04-27T18:48:53.479Z
author: iivanovw7
layout: ../../templates/BasePost.astro
tags:
    - png
    - gif
    - optipng
draft: true
---

Install optipng, jpegoptim and gifsicle

```bash
    sudo apt-get install optipng
    sudo apt-get install jpegoptim
    sudo apt-get install gifsicle

    # For MAC OS
    brew install jpegoptim
    brew install optipng
    brew install gifsicle
```

<br />

To wildcard all images recursively in the current directory and sub directories:

```bash
    find . -iname "*.png" -exec optipng -o7 {} \;
    find . -iname "*.jpg" -exec jpegoptim -m80 -o -p {} \;
    find . -iname "*.gif" -exec gifsicle --batch -V -O2 {} \;
```

<br />

To optimize sigle file:

```bash
    gifsicle --batch -V -O2 <image-name>.gif
    jpegoptim -m70 <img-name>
    optipng <img-name>.png
```

<br />
