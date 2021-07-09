const chalk = require("chalk");
const fs = require("fs");

exports.Log = async(isGroup, isCmd, typeMessage, senderNumber, groupName) => {
  if (!isGroup && isCmd) console.log(chalk.whiteBright("├"), chalk.keyword("aqua")("[ COMMAND ]"), chalk.whiteBright(typeMessage), chalk.greenBright("from"), chalk.keyword("yellow")(senderNumber))
        if (isGroup && isCmd) console.log(chalk.whiteBright("├"), chalk.keyword("aqua")("[ COMMAND ]"), chalk.whiteBright(typeMessage), chalk.greenBright("from"), chalk.keyword("yellow")(senderNumber), chalk.greenBright("in"), chalk.keyword("yellow")(groupName))
}

exports.LogError = async(e) => {
  console.log(chalk.whiteBright("├"), chalk.keyword("aqua")("[  ERROR  ]"), chalk.keyword("red")(e))
}

nocache('../main.js', module => console.log(`${module} is now updated!`))

function nocache(module, cb = () => { }) {
    console.log('Module', `'${module}'`, 'is now being watched for changes')
    fs.watchFile(require.resolve(module), async () => {
        await uncache(require.resolve(module))
        cb(module)
    })
}

function uncache(module = '.') {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(module)]
            resolve()
        } catch (e) {
            reject(e)
        }
    })
}