const File = require('./src/file')
const {error} = require('./src/constants')
const assert = require('node:assert')

/**This is an IFEE, which is a function 
 * that is executed immediately after it is created.
*/
;(async () =>{
    /**
     * variables created inside this block
     * are only valid during the execution of this block
     */
    {
        // Arrange
        const filePath = './mocks/emptyFile-invalid.csv'
        const expected = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
        
        // Act
        const result = File.csvToJson(filePath)
        
        // Assert
        await assert.rejects(result, expected)
    }

    {
        // Arrange
        const filePath = './mocks/invalid-header.csv'
        const expected = new Error(error.FILE_FIELDS_ERROR_MESSAGE)
        
        // Act
        const result = File.csvToJson(filePath)
        
        // Assert
        await assert.rejects(result, expected)
    }

    {
        // Arrange
        const filePath = './mocks/fiveItems-invalid.csv'
        const expected = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
        
        // Act
        const result = File.csvToJson(filePath)
        
        // Assert
        await assert.rejects(result, expected)
    }

    {
        // Arrange
        const filePath = './mocks/threeItems-valid.csv'
        const expected = [
            {
              id: "1",
              name: "Jhon Doe 1",
              profession: "manager 1",
              age: "31"
            },
            {
              id: "2",
              name: "Jhon Doe 2",
              profession: "manager 2",
              age: "32"
            },
            {
              id: "3",
              name: "Jhon Doe 3",
              profession: "manager 3",
              age: "33"
            }
        ]
        
        // Act
        const result = await File.csvToJson(filePath)
        
        // Assert
        assert.deepEqual(result, expected)
    }
})()