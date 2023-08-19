---
title: Preventing scroll chaining
description: Preventing scroll chaining with CSS rule "overscroll-behavior
date: 2023-04-27T18:51:26.954Z
author: iivanovw7
layout: ../../templates/BasePost.astro
tags:
    - css
    - scroll
draft: true
---

When the user scrolls an embedded web page (or any nested scroll container on the page) and reaches the end, the browser
will start scrolling the outer page.
<br />
<br />
Scroll chaining can be disabled by applying overscroll-behavior: contain to the `body` element of the embedded page (or
the scroll container).
<br/>
<br />
This feature is supported in `Firefox`, `Chromium`, and `Edge` via `Autoprefixer`.
<br/>
<br />
Might not work in Safari [WebKit bug](https://bugs.webkit.org/show_bug.cgi?id=176454)
<br />
<br />
Usage example:

```css
    body {
        overscroll-behavior: contain;
    }
```
