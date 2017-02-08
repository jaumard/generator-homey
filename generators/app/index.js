'use strict'
const Generator = require('yeoman-generator')
const chalk = require('chalk')
const yosay = require('yosay')
const path = require('path')

module.exports = class HomeyGenerator extends Generator {
  constructor(...args) {
    super(...args)
    this.argument('id', {
      description: 'Optional id for your Homey app',
      type: String,
      required: false
    })
  }

  prompting() {
    if (!this.options.id) {
      this.options.id = this.env.cwd.split(path.sep).pop()
    }
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the awe-inspiring ' + chalk.red('generator-homey') + ' app generator!'
    ))

    const prompts = [{
      name: 'name',
      message: 'What is the name of your app ?',
      required: true
    }, {
      name: 'description',
      message: 'What is the description of your app ?'
    }, {
      name: 'category',
      type: 'list',
      choices: [
        'lights',
        'video',
        'music',
        'appliances',
        'security',
        'climate',
        'tools',
        'internet',
        'localization',
        'energy'
      ]
    }, {
      name: 'permissions',
      type: 'checkbox',
      choices: [
        'homey:manager:geolocation',
        'homey:manager:ledring',
        'homey:manager:media',
        'homey:manager:speech-input',
        'homey:manager:speech-output',
        'homey:wireless:433',
        'homey:wireless:868',
        'homey:wireless:ir',
        'homey:wireless:zwave',
        'homey:wireless:nfc'
      ],
      message: 'What is the description of your app ?'
    }, {
      name: 'version',
      message: 'What is the version of your app ?',
      defaults: '0.0.1'
    }, {
      name: 'compatibility',
      message: 'What is the compatibility version of your app ?',
      defaults: '0.x || 1.x'
    }, {
      type: 'confirm',
      name: 'withSettings',
      message: 'Would you like to have a setting page ?',
      default: false
    }]

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer
      this.props = props
    }.bind(this))
  }

  writing() {
    this.fs.copy(
      this.templatePath('app.js'),
      this.destinationPath('app.js')
    )
    this.props.id = this.options.id
    if (this.props.permissions) {
      this.props.permissions = this.props.permissions.join(', ')
    }
    this.fs.copyTpl(
      this.templatePath('app.json'),
      this.destinationPath('app.json'),
      this.props
    )
    this.fs.copy(
      this.templatePath('README.md'),
      this.destinationPath('README.md')
    )
    this.fs.copy(
      this.templatePath('assets'),
      this.destinationPath('assets')
    )
    this.fs.copy(
      this.templatePath('drivers/.gitkeep'),
      this.destinationPath('drivers/.gitkeep')
    )
    this.fs.copy(
      this.templatePath('locales/en.json'),
      this.destinationPath('locales/en.json')
    )
    if (this.props.withSettings) {
      this.fs.copy(
        this.templatePath('settings/index.html'),
        this.destinationPath('settings/index.html')
      )
    }
  }
}
