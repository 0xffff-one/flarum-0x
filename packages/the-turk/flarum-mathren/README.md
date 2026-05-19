# MathRen for Flarum

[![MIT license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/the-turk/flarum-mathren/blob/master/LICENSE) [![Latest Stable Version](https://img.shields.io/packagist/v/the-turk/flarum-mathren.svg)](https://packagist.org/packages/the-turk/flarum-mathren) [![Total Downloads](https://img.shields.io/packagist/dt/the-turk/flarum-mathren.svg)](https://packagist.org/packages/the-turk/flarum-mathren)

An extension that handles TeX math rendering for your [Flarum](https://github.com/flarum) forum.

![Screenshot](https://i.imgur.com/OuT8Luf.png)

![Action](https://i.imgur.com/GEkwFtR.gif)

[Click to view settings screenshot](https://i.imgur.com/psB1noF.png)

## Features

- Based on [KaTeX](https://github.com/KaTeX/KaTeX) (the fastest math typesetting library on the web).
- Supports [AsciiMath](http://asciimath.org/) syntax.
- Display expressions as an inline or a block element.
- Compatible with Markdown and BBCode.
- Copy any expression's source code to the clipboard.
- Integration with `flarum/mentions` extension so you can quote expressions with selection.
- Works on preview mode.

## Installation

```bash
composer require the-turk/flarum-mathren
```

## Updating

```bash
composer update the-turk/flarum-mathren
php flarum cache:clear
```

## Usage

Enable the extension.

___

#### Block Expressions `displayMode: true`

Wrap your TeX code with `[math]` and `[/math]` or your custom delimiters.

```
[math]\int_{-\infty}^\infty\hat\xi\,e^{2\pi i\xi x}\,d\xi[/math]
```

Block expressions will be wrapped with `.mathren-block` class.

#### Inline Expressions `displayMode: false`

Wrap your TeX code with `[imath]` and `[/imath]` or your custom delimiters.

```
Lorem ipsum dolor [imath]\varDelta = b^2-4ac[/imath] sit amet.
```

Inline expressions will be wrapped with `.mathren-inline` class.

___

Wrap your expression with \`backticks\` or `code` tag to skip rendering.

## Links

- [Flarum Discuss post](https://discuss.flarum.org/d/22439-mathren-tex-math-rendering)
- [Source code on GitHub](https://github.com/the-turk/flarum-mathren)
- [Changelog](https://github.com/the-turk/flarum-mathren/blob/master/CHANGELOG.md)
- [Report an issue](https://github.com/the-turk/flarum-mathren/issues)
- [Download via Packagist](https://packagist.org/packages/the-turk/flarum-mathren)
