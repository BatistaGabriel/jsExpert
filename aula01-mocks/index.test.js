const {error} = require('./src/constants')
const File = require('./src/file')
const {rejects, deepStrictEqual} = require('assert')
;
(async() =>{
    {
        const filePath = './mocks/emptyFile-invalid.csv'
        const rejection = new Error(error.FILE_LENGHT_ERROR_MESSAGE)
        const result = File.csvToJson(filePath)
        await rejects(result, rejection)
    }

    {    
        const filePath = './mocks/fourItems-invalid.csv'
        const rejection = new Error(error.FILE_LENGHT_ERROR_MESSAGE)
        const result = File.csvToJson(filePath)
        await rejects(result, rejection)
    }
    
    {    
        const filePath = './mocks/threeItems-valid.csv'
        // implementação para substituir o comportamento padrao do Date
        Date.prototype.getFullYear = () => 2020
        const result = await File.csvToJson(filePath)
        const expected = [
            {
              "id": 123,
              "name": "gabriel",
              "profession": "developer",
              "birthday": 1992
            },
            {
              "id": 321,
              "name": "jhon doe",
              "profession": "specialist",
              "birthday": 1940
            },
            {
              "id": 312,
              "name": "jane doe",
              "profession": "java developer",
              "birthday": 2000
            }
        ]
        
        deepStrictEqual(JSON.stringify(result), JSON.stringify(expected))
    }
})()