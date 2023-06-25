---
title: Cumulative pathnames
description: Converts a path into cumulative segments in JavaScript
date: 2023-05-11T11:20:32.909Z
author: iivanovw7
layout: ../../templates/BasePost.astro
tags:
    - js
    - ts
draft: false
---

Converts given a path like`/foo/bar/baz/` into an array like this:
`["/foo/", "/foo/bar/", "/foo/bar/baz/"]`

### getCumulativePathSegments.ts

```typescript
const pathAccumulator = (acc = "") => {
    return (value: string) => (acc += `${value}/`);
};

/**
 * Converts path into an array of segments, starting from left.
 * @param {string} path
 * @return {Array<string>} list of accumulated path segments.
 * @example
 *        const path = "/foo/bar/baz/";
 *        getCumulativePathSegments(path); //=> ['/foo/', '/foo/bar/', '/foo/bar/baz/']
 */
export const getCumulativePathSegments = (path: string) => {
    return path.split("/").filter(Boolean).map(pathAccumulator("/"));
};
```

### getCumulativePathSegments.spec.ts

```typescript
import { getCumulativePathSegments } from "./getCumulativePathSegments";

describe("[getCumulativePathSegments]", () => {
    const check = (path: string, assert: Array<string>) => {
        expect(getCumulativePathSegments(path)).toEqual(assert);
    };

    it("Should split paths without trailing slash", () => {
        check("", []);
        check("foo", ["/foo/"]);
        check("foo/bar", ["/foo/", "/foo/bar/"]);
        check("foo/bar:id", ["/foo/", "/foo/bar:id/"]);
        check("foo/bar/baz", ["/foo/", "/foo/bar/", "/foo/bar/baz/"]);
    });

    it("Should split paths with trailing slash", () => {
        check("/", []);
        check("/foo", ["/foo/"]);
        check("/foo/bar", ["/foo/", "/foo/bar/"]);
        check("/foo/bar:id", ["/foo/", "/foo/bar:id/"]);
        check("/foo/bar/baz", ["/foo/", "/foo/bar/", "/foo/bar/baz/"]);
    });
});
```
