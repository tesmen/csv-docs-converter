import { ChalkedConsoleLogger } from './services/Logger.js'

export class LegacyCsvParser {
    /** @type {ChalkedConsoleLogger} */
    logger

    constructor() {
        this.logger = new ChalkedConsoleLogger()
        this.tableFunctions = new TableFunctions()
    }

    parse(content) {
        let lines = content.split(/\n/)

        lines = lines.map(line => this.processLine(line))

        return lines.map(line => line + '\n').join('')
    }

    processLine(str) {
        const segments = str.split(';')

        this.tableFunctions.deleteColumns(segments, [
            3, // по ходу там надо было удалить 3 или 4 колонку

            //  "от ты мне обьясни, почему слева 7 точказапятых а справа 4 палочки?"
            11,
            12,
            13,
        ])

        // приводим несколько колонок к нужному количеству знаков после запятой
        this.tableFunctions.bringColumnToNormalizedFloat(segments, 9)
        this.tableFunctions.bringColumnToNormalizedFloat(segments, 8)
        this.tableFunctions.bringColumnToNormalizedFloat(segments, 7)

        // и как будто после N-й колонки тоже никому ничего не надо
        this.tableFunctions.deleteColumnsAfter(segments, 14)

        return segments.join('|')
    }

}

/**
 * Класс чтобы тупо не запутаться в нумерации человеческих колонок начинающихся с 1
 * и индексов масссива идущих от 0
 */
class TableFunctions {
    /** @type {ChalkedConsoleLogger} */
    logger

    constructor() {
        this.logger = new ChalkedConsoleLogger()
    }

    /**
     * @param {string[]} source
     * @param {number[]} columnNumbers
     */
    deleteColumns(source, columnNumbers) {
        columnNumbers.map(number => source.splice(number - 1, 1))
    }

    deleteColumnsAfter(source, columnNumber) {
        return source.splice(columnNumber - 1)
    }

    bringColumnToNormalizedFloat(source, columnNumber) {
        if(source[columnNumber - 1] === '') {
            return ''
        }

        const float = parseFloat(source[columnNumber - 1]).toFixed(6)

        if(isNaN(float)) {
            this.logger.warn(`"${source[columnNumber - 1]}" is not a Float type`)
        }

        return source[columnNumber - 1] = float
    }
}
