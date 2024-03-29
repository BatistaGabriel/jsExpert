const {readFile} = require('fs/promises')
const DEFAULT_OPTIONS = {
    maxLines: 3,
    fields: ['id', 'name', 'profession', 'age']
}
const {error} = require('./constants')

class File {
    static async csvToJson(filePath) {
        const content = await readFile(filePath, 'utf8')
        const validation = this.isValid(content)
        if(!validation.valid) throw new Error(validation.error)

        const result = this.parseCSVToJSON(content)

        return result
    }

    static isValid(csvString, options = DEFAULT_OPTIONS) {
        /**
         * In order to take a look at the content of the csvString
         * you can use the following command:
         * 
         * fs.readFileSync('./mocks/NameOfTheFile.csv', 'utf8')
        */

        /**
         * the follwing stucture is called destructuring,
         * which is a way to extract data from arrays and objects
        */
        const [headers, ...fileWithoutHeaders] = csvString.split(/\r?\n/)

        /**
         * the following lines performs the bussiness rules validations
         * for:
         *   - the header of the file, it must be the same as the fields defined at the options
         *   - the length of the file, it must be less than or equal to the maxLines defined at the options
         */
        const isHeaderValid = headers === options.fields.join(',')
        if(!isHeaderValid){
            return{
                error: error.FILE_FIELDS_ERROR_MESSAGE,
                valid: false
            }
        }

        if(!fileWithoutHeaders.length || 
            fileWithoutHeaders.length > options.maxLines){
            return{
                error: error.FILE_LENGTH_ERROR_MESSAGE,
                valid: false
            }
        }

        return {valid: true	}
    }

    static parseCSVToJSON(csvString){
        const lines = csvString.split(/\r?\n/)

        // this will remove the header from the array
        const firstLine = lines.shift()
        const header = firstLine.split(',')

        const users = lines.map(line => {
            const columns = line.split(',')
            const user = {}
            for(const index in columns){
                user[header[index]] = columns[index].trim()
            }

            return user
        })

        return users
    }
}

module.exports = File