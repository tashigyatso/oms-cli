const Metalsmith = require('metalsmith')
const inquirer = require('inquirer')
const path = require('path')
const ora = require('ora')
const chalk = require('chalk')
const transformIntoAbsolutePath = require('./local-path').transformIntoAbsolutePath

module.exports = (tmpPath) => {
  const metalsmith = Metalsmith(tmpPath)
  inquirer.prompt([{
    type: 'input',
    name: 'name',
    message: 'The name of project',
    default: 'oms-project'
  }, {
    type: 'input',
    name: 'destination',
    message: 'The destination of project',
    default: process.cwd()
  }]).then(answer => {
    // 生成项目的路径
    const destination = path.join(transformIntoAbsolutePath(answer.destination), answer.name)
    const spinner = ora('generating...').start()
    // 加入新的配置
    Object.assign(metalsmith.metadata(), answer)
    
    spinner.start()

    metalsmith
      .source('.')
      .destination(destination)
      .clean(false)
      .build(function (err) {      
        spinner.stop()
        if (err) throw err
        console.log()
        console.log(chalk.green('Build Successfully'))
        console.log()
        console.log((`${chalk.green('Please cd')} ${destination} ${chalk.green('to start your coding')}`))
        console.log()
      })
  })
}
