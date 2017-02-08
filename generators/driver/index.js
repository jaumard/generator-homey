'use strict'
const Generator = require('yeoman-generator')
const chalk = require('chalk')
const yosay = require('yosay')
const fs = require('fs')

module.exports = class HomeyDriverGenerator extends Generator {
  constructor(...args) {
    super(...args)
    this.argument('id', {
      description: 'Required name for your app\' driver',
      type: String,
      required: true
    })
  }

  initializing() {
    if (!fs.existsSync('app.json')) {
      throw new Error('You\'re not under a homey app folder !')
    }
  }

  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the awe-inspiring ' + chalk.red('generator-homey') + ' app generator!'
    ))

    const prompts = [{
      name: 'name',
      message: 'What is the name of your driver ?',
      default: this.options.id,
      required: true
    }, {
      name: 'driverClass',
      message: 'What is the class of your driver ?',
      type: 'list',
      choices: [
        'button',
        'coffeemachine',
        'windowcoverings',
        'doorbell',
        'fan',
        'heater',
        'homealarm',
        'kettle',
        'light',
        'lock',
        'other',
        'sensor',
        'speaker',
        'thermostat',
        'vacuumcleaner',
        'socket',
        'zwavecontroller'
      ],
      default: 'other'
    }]

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer
      this.props = props
    }.bind(this))
  }

  writing() {
    this.fs.copy(
      this.templatePath('driver.js'),
      this.destinationPath('drivers/' + this.options.id + '/driver.js')
    )
    this.fs.copy(
      this.templatePath('assets'),
      this.destinationPath('drivers/' + this.options.id + '/assets')
    )

    const driverData = {
      id: this.options.id,
      name: {
        en: this.props.name
      },
      class: this.props.driverClass,
      images: {
        large: 'drivers/bulb/assets/images/large.jpg',
        small: 'drivers/bulb/assets/images/small.jpg'
      }
    }

    const app = require(this.contextRoot + '/app.json')
    if (!app.drivers) {
      app.drivers = []
    }
    app.drivers.push(driverData)
    this.fs.writeJSON('app.json', app)
  }
}
