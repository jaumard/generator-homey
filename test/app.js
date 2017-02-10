'use strict'
const path = require('path')
const assert = require('yeoman-assert')
const helpers = require('yeoman-test')

describe('generator-homey:app', function () {

  describe('with permissions', function () {
    before(function () {
      return helpers.run(path.join(__dirname, '../generators/app'))
        .withPrompts({
          name: 'test',
          description: 'test description',
          withSettings: true,
          category: 'lights',
          permissions: ['homey:manager:speech-input', 'homey:manager:speech-output'],
          version: '0.0.1',
          compatibility: '0.x || 1.x'
        })
        .toPromise()
    })

    it('should populate app.json correctly', function () {
      assert.jsonFileContent('app.json', {
        'version': '0.0.1',
        'compatibility': '0.x || 1.x',
        'name': {
          'en': 'test'
        },
        'category': 'lights',
        'description': {
          'en': 'test description'
        },
        'drivers': [],
        'permissions': ['homey:manager:speech-input', 'homey:manager:speech-output']
      })
    })
  })

  describe('with settings', function () {
    before(function () {
      return helpers.run(path.join(__dirname, '../generators/app'))
        .withPrompts({
          name: 'test',
          description: 'test description',
          withSettings: true,
          category: 'lights',
          permissions: [],
          version: '0.0.1',
          compatibility: '0.x || 1.x'
        })
        .toPromise()
    })

    it('should creates files', function () {
      assert.file([
        'app.js',
        'app.json',
        'README.md',
        'locales/en.json',
        'settings/index.html',
        'assets/icon.svg',
        'assets/images/large.jpg',
        'assets/images/small.jpg',
        'drivers/.gitkeep'
      ])
    })

    it('should populate app.json correctly', function () {
      assert.jsonFileContent('app.json', {
        'version': '0.0.1',
        'compatibility': '0.x || 1.x',
        'name': {
          'en': 'test'
        },
        'category': 'lights',
        'description': {
          'en': 'test description'
        },
        'drivers': [],
        'permissions': []
      })
    })
  })

  describe('without settings', function () {
    before(function () {
      return helpers.run(path.join(__dirname, '../generators/app'))
        .withPrompts({withSettings: false})
        .toPromise()
    })

    it('should creates files', function () {
      assert.file([
        'app.js',
        'app.json',
        'README.md',
        'locales/en.json',
        'assets/icon.svg',
        'assets/images/large.jpg',
        'assets/images/small.jpg',
        'drivers/.gitkeep'
      ])
    })

    it('should doesn\'t create settings', function () {
      assert.noFile('settings/index.html')
    })
  })

  describe('with id argument', function () {
    before(function () {
      return helpers.run(path.join(__dirname, '../generators/app'))
        .withArguments('com.homey.hello')
        .withPrompts({
          name: 'test',
          description: 'test description',
          withSettings: true,
          category: 'lights',
          permissions: [],
          version: '0.0.1',
          compatibility: '0.x || 1.x'
        })
        .toPromise()
    })

    it('should populate app.json correctly', function () {
      assert.jsonFileContent('com.homey.hello/app.json', {
        'id': 'com.homey.hello',
        'version': '0.0.1',
        'compatibility': '0.x || 1.x',
        'name': {
          'en': 'test'
        },
        'category': 'lights',
        'description': {
          'en': 'test description'
        },
        'drivers': [],
        'permissions': []
      })
    })
  })
})
