const log = console.log
import chalk from 'chalk'

export class ChalkedConsoleLogger {
    info(message) {
        log(chalk.blue(message))
    }

    warn(message) {
        log(chalk.yellow(message))
    }

    error(...message) {
        log(chalk.bgRed.white(...message))
    }

    success(message) {
        log(chalk.green(message))
    }
}
