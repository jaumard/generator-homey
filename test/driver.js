'use strict'
const path = require('path')
const assert = require('yeoman-assert')
const helpers = require('yeoman-test')

describe('generator-homey:driver', function () {

  before(function () {

    return helpers.run(path.join(__dirname, '../generators/driver'))
      .inTmpDir(function (dir) {
        const done = this.async() // `this` is the RunContext object.
        helpers.run(path.join(__dirname, '../generators/app'))
          .withArguments('com.homey.test')
          .withPrompts({name: 'test', description: 'test description', version: '0.0.1', compatibility: '0.x || 1.x'})
          .toPromise().then(done).catch(done)
      })
      .withArguments('bulb')
      .withPrompts({name: 'Bulb', driverClass: 'light', version: '0.0.1', compatibility: '0.x || 1.x'})
      .toPromise()
  })

  it('should creates files', function () {
    assert.file([
      'drivers/bulb/driver.js',
      'drivers/bulb/assets/icon.svg',
      'drivers/bulb/assets/images/large.jpg',
      'drivers/bulb/assets/images/small.jpg'
    ])
  })

  it('should populate app.json correctly', function () {
    assert.jsonFileContent('app.json', {
      'id': 'com.homey.test',
      'version': '0.0.1',
      'compatibility': '0.x || 1.x',
      'name': {
        'en': 'test'
      },
      'description': {
        'en': 'test description'
      },
      'drivers': [{
        'id': 'bulb',
        'name': {
          'en': 'Bulb'
        },
        'class': 'light',
        'images': {
          'large': 'drivers/bulb/assets/images/large.jpg',
          'small': 'drivers/bulb/assets/images/small.jpg'
        }
      }],
      'permissions': []
    })
  })
})
