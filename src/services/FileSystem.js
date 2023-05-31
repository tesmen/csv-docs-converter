import fs from 'fs'

export class FileSystem {

    /**
     * @param {string} path
     * @return {Buffer}
     */
    readFileContents(path) {
        return fs
            .readFileSync(path)
    }

    writeFileSync(path, content) {
        return fs
            .writeFileSync(path, content)
    }

    /**
     * Useful for debugging large plain text data.
     * Content will be stored to a file in ./outs directory and named with a current timestamp.
     *
     * @deprecated As should not be used in production. Dev envs only.
     */
    writeOut(content) {
        let extension = 'json'
        let filename

        if(typeof content === 'string') {
            try {
                JSON.parse(content)
            } catch(e) {
                extension = 'txt'
            }

            filename = `./outs/${(new Date).toISOString()}.${extension}`

            this.writeFileSync(filename, content)
        } else {
            filename = `./outs/${(new Date).toISOString()}.${extension}`
            this.writeFileSync(filename, JSON.stringify(content))
        }

        console.log(`Saved file content at ${filename}`)
    }

    /**
     * @param path e.g. "./app/Commands/Update/julius_tiktok_batch_results_10102022.csv"
     */
    readJSONFile(path) {
        const raw = this
            .readFileContents(path)
            .toString()

        return JSON.parse(raw)
    }

    readPathFiles(path) {
        return fs.readdirSync(path)
    }
}
