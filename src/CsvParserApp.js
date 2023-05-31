import { LegacyCsvParser } from './LegacyCsvParser.js'
import { FileSystem } from './services/FileSystem.js'
import * as path from 'path'
import { ChalkedConsoleLogger } from './services/Logger.js'

const INPUT_FOLDER = './files-input'
const OUTPUT_FOLDER = './files-output'

export class CsvParserApp {
    /** @type {LegacyCsvParser} */
    csvParser
    /** @type {FileSystem} */
    fileSystem
    /** @type {ChalkedConsoleLogger} */
    logger = ChalkedConsoleLogger

    constructor() {
        this.csvParser = new LegacyCsvParser
        this.fileSystem = new FileSystem()
        this.logger = new ChalkedConsoleLogger
    }

    processFiles() {
        const files = this.fileSystem.readPathFiles(INPUT_FOLDER)

        if(!files.length) {
            this.logger.warn(`Nothing to process`)
        }

        for(const fileName of files) {
            try {
                const inputFilePath = path.resolve(INPUT_FOLDER, fileName)

                this.logger.info(`Reading ${inputFilePath}`)

                const parsed = this.csvParser.parse(
                    this.fileSystem.readFileContents(inputFilePath),
                )

                const outputFilePath = path.resolve(OUTPUT_FOLDER, fileName)
                this.fileSystem.writeFileSync(outputFilePath)
            } catch(e) {
                this.logger.error(e.message, e.stack)
            }

        }
    }
}