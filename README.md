# generator-homey [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Code Climate][codeclimate-image]][codeclimate-url]
> Homey App generator

This generator allow you to create a basic homey app structure ready to deploy with permissions, category. It also let you generate drivers for a generated app.

## Installation

First, install [Yeoman](http://yeoman.io) and generator-homey using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-homey
```

Then generate your new project:

```bash
yo homey
//or 
yo homey com.homey.hello
```

You can also generate new driver to your homey app like this:
```bash
yo homey:driver driverId
```

## Getting To Know Yeoman

 * Yeoman has a heart of gold.
 * Yeoman is a person with feelings and opinions, but is very easy to work with.
 * Yeoman can be too opinionated at times but is easily convinced not to be.
 * Feel free to [learn more about Yeoman](http://yeoman.io/).

## License

MIT © [jaumard](https://github.com/jaumard)


[npm-image]: https://badge.fury.io/js/generator-homey.svg
[npm-url]: https://npmjs.org/package/generator-homey
[travis-image]: https://travis-ci.org/jaumard/generator-homey.svg?branch=master
[travis-url]: https://travis-ci.org/jaumard/generator-homey
[daviddm-image]: https://david-dm.org/jaumard/generator-homey.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/jaumard/generator-homey
[codeclimate-image]: https://img.shields.io/codeclimate/github/jaumard/generator-homey.svg?style=flat-square
[codeclimate-url]: https://codeclimate.com/github/jaumard/generator-homey
