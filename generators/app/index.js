'use strict'
const Generator = require('yeoman-generator')
const chalk = require('chalk')
const yosay = require('yosay')
const path = require('path')

module.exports = class HomeyGenerator extends Generator {
  constructor(args, opts) {
    super(args, opts)
    this.argument('id', {
      description: 'Optional id for your Homey app',
      type: String,
      required: false
    })
  }

  prompting() {
    this.options.needRootFolder = true
    if (!this.options.id) {
      this.options.needRootFolder = false
      this.options.id = this.env.cwd.split(path.sep).pop()
    }
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the awe-inspiring ' + chalk.red('generator-homey') + ' app generator!'
    ))

    const prompts = [{
      name: 'name',
      message: 'What is the name of your app ?',
      default: this.options.id.split('.').pop(),
      required: true
    }, {
      name: 'description',
      message: 'What is the description of your app ?'
    }, {
      name: 'category',
      message: 'What is the category of your app ?',
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
      message: 'Choose permissions needed for your app ?'
    }, {
      name: 'version',
      message: 'What is the version of your app ?',
      default: '0.0.1'
    }, {
      name: 'compatibility',
      message: 'What is the compatibility version of your app ?',
      default: '0.x || 1.x'
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
    const root = this.options.needRootFolder ? this.options.id + '/' : ''
    this.fs.copy(
      this.templatePath('app.js'),
      this.destinationPath(root + 'app.js')
    )
    this.props.id = this.options.id
    if (this.props.permissions && this.props.permissions.length > 0) {
      this.props.permissions = '\'' + this.props.permissions.join('\', \'') + '\''
    }
    this.fs.copyTpl(
      this.templatePath('app.json'),
      this.destinationPath(root + 'app.json'),
      this.props
    )
    this.fs.copy(
      this.templatePath('README.md'),
      this.destinationPath(root + 'README.md')
    )
    this.fs.copy(
      this.templatePath('assets'),
      this.destinationPath(root + 'assets')
    )
    this.fs.copy(
      this.templatePath('drivers/.gitkeep'),
      this.destinationPath(root + 'drivers/.gitkeep')
    )
    this.fs.copy(
      this.templatePath('locales/en.json'),
      this.destinationPath(root + 'locales/en.json')
    )
    if (this.props.withSettings) {
      this.fs.copy(
        this.templatePath('settings/index.html'),
        this.destinationPath(root + 'settings/index.html')
      )
    }
  }
}
