---
title: Basic SCSS geometry mixins.
description: Set of basic geometry mixins, written in SCSS preprocessor.
date: 2023-04-27T18:35:07.378Z
author: iiavnovw7
layout: ../../templates/BasePost.astro
tags:
    - css
    - scss
draft: true
---

#### Rectangle

```css
/*
 * Создает форму прямоугольника заданного размера и цвета.
 *
 * @param {String} width - Значение свойства `width`.
 * @param {String} height - Значение свойства `height`.
 * @param {String} color [transparent] - Значение свойства `background`.
 *
 * @example scss - Пример использования в SCSS.
 *  @include rectangle(1rem, 1rem, red);
 *
 * @author Igor Ivanov
 */
@mixin rectangle($width, $height, $color: transparent) {
    background: $color;
    height: $height;
    width: $width;
}
```

<br />

#### Square

```css
/*
 * Создает форму квадрата заданного размера и цвета.
 *
 * @param {String} size - длина стороны квадрата, используется как значение свойств `width` и `height` внутреннего микшина `rectangle`.
 * @param {String} color [transparent] - Значение свойства `color` внутреннего микшина `rectangle`.
 *
 * @example scss - Пример использования в SCSS.
 *  @include square(1rem, red);
 *
 * @author Igor Ivanov
 */
@mixin square($size, $color: transparent) {
    @include rectangle($size, $size, $color);
}
```

<br />

#### Circle

```css
/*
 * Создает форму круга заданного размера и цвета.
 *
 * @param {String} size - радиус круга, используется как значение свойства `size` внутреннего микшина `square`.
 * @param {String} color [transparent] - Значение свойства `color` внутреннего микшина `square`.
 *
 * @example scss - Пример использования в SCSS.
 *  @include circle(1rem, red);
 *
 * @author Igor Ivanov
 */
@mixin circle($size, $color: transparent) {
    @include square($size, $color);

    border-radius: $size / 2;
}
```

<br />

#### Triangle

```css
/*
 * Создает форму равностороннего треугольника заданной высоты, повернутого вершиной в требуемую сторону, либо повернутого на заданный угол.
 *
 * @param {String} height - высота треугольника, значение свойства длины `border-bottom`.
 * @param {String} color ['white'] - цвет треугольника, значение свойства цвета `border-bottom`.
 * @param {Number} angle [0] - угол, на который следует повернуть треугольник. Если параметр отличен от 0 - отменяет действие параметра `direction`.
 * @param {String} direction ['up'] - ориентация треугольника (направление вершины), если параметр `angle` задан равным 0.
 * @param {String} center ['center'] - точка (`transform-origin`), относительно которой, выполняется поворот фигуры, по умолчанию - центр квадрата, в который вписан треугольник.
 *
 * @example scss - Пример использования в SCSS.
 *  @include triangle(17.428rem, #fff, 0, 'up');
 *
 * @author Igor Ivanov
 */
@mixin triangle($height, $color: 'white', $angle: 0, $direction: 'up', $center: 'center') {
    border-bottom: $height solid $color;
    border-left: $height / 2 solid transparent;
    border-right: $height / 2 solid transparent;
    height: 0;
    transform-origin: $center;
    width: 0;

    @if $angle != 0 {
        transform: rotate(#{$angle}deg);
    }
    @else if $direction == 'up' {
        transform: rotate(0deg);
    }
    @else if $direction == 'right' {
        transform: rotate(90deg);
    }
    @else if $direction == 'bottom' {
        transform: rotate(180deg);
    }
    @else if $direction == 'left' {
        transform: rotate(270deg);
    }
}
```

<br />

#### Sample usage

```css
.vp-program-description__poster-btn-circle {
    @include circle(
    $vp-channel-program-description-play-button-size,
    linear-gradient(135deg, #ff7657 0%, #fd9644 100%)
    );

    box-shadow: 0 0.143rem 0.714rem rgba(253, 150, 68, 0.25);
    cursor: pointer;
    margin: auto auto;
    position: relative;
}

.vp-program-description__poster-btn-triangle {
    @include triangle(1.428rem, #fff, 0, 'right');

    bottom: 0;
    left: 0;
    margin: auto 1.143rem;
    position: absolute;
    right: 0;
    top: 0;
}
```
