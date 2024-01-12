const Service = require('./service');
const assert = require('node:assert');
const BASE_URL_1 = 'https://swapi.dev/api/planets/1/';
const BASE_URL_2 = 'https://swapi.dev/api/planets/2/';
const {createSandbox} = require('sinon');
const sinon = createSandbox();
const mocks = {
    alderaan: require('./../mocks/alderaan.json'),
    tatooine: require('./../mocks/tatooine.json')
}

;(async () => {
    // {
    //     
    //      // using this way each time this runs we are 
    //      // reaching the API using internet connection
    //      
    //     const service = new Service()
    //     const data = await service.makeRequest(BASE_URL_2)
    //     console.log(JSON.stringify(data))
    // }
    
    /**
     * the focus of those tests is not to grant that the
     * for each call performed to the API, the API is up.
     * The goal here is to test the logic of the application
     * based on the data returned by the API and grant that
     * on our side, the application is working as expected
     * independently of the API status.
     */
    
    const service = new Service()
    const stub = sinon.stub(
        service, 
        service.makeRequest.name
    )

    stub.withArgs(BASE_URL_1)
        .resolves(mocks.tatooine)
    
    stub.withArgs(BASE_URL_2)
        .resolves(mocks.alderaan)

    {
        // Arrange
        const expected = {
            "name": "Tatooine",
            "surfaceWater": "1",
            "appearedIn": 5
        }

        // Act
        const results = await service.getPlanets(BASE_URL_1)

        // Assert
        assert.deepStrictEqual(results, expected)

    }

    {
        // Arrange
        const expected = {
            "name": "Alderaan",
            "surfaceWater": "40",
            "appearedIn": 2
        }

        // Act
        const results = await service.getPlanets(BASE_URL_2)

        // Assert
        assert.deepStrictEqual(results, expected)
    }
})()