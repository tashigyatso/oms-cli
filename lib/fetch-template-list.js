const ora = require('ora')
const chalk =require('chalk')
const request = require('request')

module.exports = (callback) => {
  const spinner = ora('fetching template list...')
  spinner.start()
  request({
    uri: 'https://wy72yjf.github.io/oms-cli/oms-cli-template.json',
    timeout: 5000
  }, (err, response, body) => {
    if (err) {
      spinner.fail(chalk.red('fetch template list unsuccessfully'))
      console.log(err)
    }
    if (response && response.statusCode === 200) {
      spinner.succeed(chalk.green('fetch template list successfully'))
      callback(JSON.parse(body))
    }
  })
}
