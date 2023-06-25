---
title: Asynchronous functions in js
description: Different ways of how to define and use async functions
date: 2023-04-27T18:53:31.137Z
author: iivanovw7
layout: ../../templates/BasePost.astro
tags:
    - js
    - async
draft: true
---

Simplest and native js way is to use `setTimeout` method:

```javascript
    setTimeout(function () {
    console.log('Async function');
});

console.log('Sync function 1');

for (let i = 0; i < 10000; ++i) {
    sampleFunction();
}

console.log('Test 2');

function sampleFunction() {
    return 1 + 1;
}
```

Async function will be executed only after the main thread is no longer busy dealing with Sync functions
<br />
<br />
Second native js option is to use `setInterval` method:

```javascript
    let counter = 0;

    let timer = setInterval(function() {
        console.log('Async function');

        counter += 1;

        if (counter >= 5) {
            clearInterval(timer);
        }
    }, 1000);

    console.log('Sync function');
```

<br />

The output should look like::

```javascript
   Sync function
   Async function
   Async function
   Async function
   Async function
   Async function
   Async function
```

<br />
