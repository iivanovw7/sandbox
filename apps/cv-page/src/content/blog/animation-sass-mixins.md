---
title: Animation SASS mixins
description: Few useful SASS mixins related mostly to CSS animation
    cross-browser support (SCSS syntax)
date: 2023-02-08T22:07:15.632Z
author: iivanovw7
layout: ../../templates/BasePost.astro
tags:
    - css
    - mixins
    - sass
draft: false
---

### 1. Transition, Transform, Animation and `keyfarmes` mixins

```scss
    @mixin transition($transition...) {
    -webkit-transition: $transition;
    -o-transition: $transition;
    transition: $transition;
    will-change: transform;
}

@mixin transform($transform, $willChange: transform) {
    -webkit-transform: $transform;
    -moz-transform: $transform;
    -o-transform: $transform;
    -ms-transform: $transform;
    transform: $transform;
    will-change: $willChange;
}

@mixin animation($name) {
    -webkit-animation: $name;
    -moz-animation: $name;
    -ms-animation: $name;
    -o-animation: $name;
    animation: $name;
}

@mixin keyframes($name) {
    @-webkit-keyframes #{$name} {
        @content;
    }
    @-moz-keyframes #{$name} {
        @content;
    }
    @-ms-keyframes #{$name} {
        @content;
    }
    @keyframes #{$name} {
        @content;
    }
}
```

<br />

Sample usage:

```scss
    // Transform and Keyframes mixins combined
@include keyframes(marquee-forwards-copy) {
    0% {
        @include transform(translate3d(100%, 0, 0));
        opacity: 1;
    }
    100% {
        @include transform(translate3d(-100%, 0, 0));
        opacity: 1;
    }
}

// Transform mixin
.poster {
    @include transform(perspective(12.5rem) translate3d(0, 0, unit(18)));
}

// Animation mixin
.marquee-text {
    @include animation(marquee-forwards infinite linear);

    &.copy {
        @include animation(marquee-forwards-copy infinite linear);
    }
}

// Transition mixin
&.support-marquee {
    will-change: opacity;
    opacity: 1;
    @include transition(opacity 0ms linear);
}
```

<br />

### 2. Prefix prop mixin

```scss
    @mixin prefix-prop($prop-map) {
    @each $prop, $value in $prop-map {
        @if index($list: $prefix-value-prop-name, $value: $prop) {
            #{$prop}: -webkit-#{$value};
            #{$prop}: $value;
        } @else {
            -webkit-#{$prop}: $value;
            #{$prop}: $value;
        }
    }
}
```

<br />

Sample usage:

```scss
    @include prefix-prop((
        flex-grow: 0,
        flex-shrink: 0
));
```
