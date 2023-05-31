import { FileSystem } from './services/FileSystem.js'

export class LegacyCsvParser {
    /** @type {FileSystem} */
    fileSystem

    constructor() {
        this.fileSystem = new FileSystem()
    }

    parse(content) {
        const fileContent = content
    }
}
