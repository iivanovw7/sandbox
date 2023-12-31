---
title: Fast search by folder name
description: Search folder on linux
date: 2023-04-27T18:08:22.669Z
author: iivanovw7
layout: ../../templates/BasePost.astro
tags:
    - linux
    - ubuntu
    - search
    - cheatsheet
    - find
draft: false
---

#### Usage example in component:

For Debian:

```bash
  find / -xdev 2>/dev/null -name "TorBrowser"
  # Or folder full path instead of "/"
```

<br />

For Ubuntu:

```bash
  find / -name TorBrowser -type d
  # Or folder full path instead of "/"
```

<br />

Cheat sheet for `find`

```bash
  # Find files by case-insensitive extension (ex: .jpg, .JPG, .jpG):
  find . -iname '*.jpg'

  # Find directories:
  find . -type d

  # Find files:
  find . -type f

  # Find files by octal permission:
  find . -type f -perm 777

  # Find files with setuid bit set:
  find . -xdev \( -perm -4000 \) -type f -print0 | xargs -0 ls -l

  # To find files with extension '.txt' and remove them:
  find ./path/ -name '*.txt' -exec rm '{}' \;

  # Find files with extension '.txt' and look for a string into them:
  find ./path/ -name '*.txt' | xargs grep 'string'

  # Find files with size bigger than 5 Mb and sort them by size:
  find . -size +5M -type f -print0 | xargs -0 ls -Ssh | sort -z

  # Find files bigger thank 2 MB and list them:
  find . -type f -size +20000k -exec ls -lh {} \; | awk '{ print $9 ": " $5 }'

  # Find files modified more than 7 days ago and list file information
  find . -type f -mtime +7d -ls

  # Find symlinks owned by a user and list file information
  find . -type l --user=username -ls

  # Search for and delete empty directories
  find . -type d -empty -exec rmdir {} \;

  # Search for directories named build at a max depth of 2 directories
  find . -maxdepth 2 -name build -type d

  # Search all files who are not in .git directory
  find . ! -iwholename '*.git*' -type f

  # Find all files that have the same node (hard link) as MY_FILE_HERE
  find . -type f -samefile MY_FILE_HERE 2>/dev/null

  # Find all files in the current directory and modify their permissions
  find . -type f -exec chmod 644 {} \;

  # Find files with extension '.txt.' and edit all of them with vim
  # vim is started only once for all files
  find . -iname '*.txt' -exec vim {} \+

  # Find all files with extension '.png' and rename them by changing extension to
  # '.jpg' (base name is preserved)
  find . -type f -iname '*.png' -exec bash -c 'mv "$0" "${0%.*}.jpg"' {} \;

  # Use logic and grouping to delete extension-specific files.
  find \( -iname "*.jpg" -or -iname "*.sfv" -or -iname "*.xspf" \) -type f -delete

  # List all executable files, by basename, found within PATH.
  find ${PATH//:/ } -type f -executable -printf "%P\n"
```

<br />

Cheat sheet is taken from [cheat.sh](https://cheat.sh)
