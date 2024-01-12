const {describe, it, before, beforeEach, afterEach} = require('mocha')
const {join} = require('node:path')
const {expect} = require('chai')
const sinon = require('sinon')
const {sandbox} = require('sinon')
const CarService = require('../../src/service/carService')
const Transaction = require('../../src/entities/transaction')

const carsDatabase = join(__dirname, '../../database', 'cars.json')
const mocks = {
    validCar: require('../mocks/valid-car.json'),
    validCarCategory: require('../mocks/valid-carCategory.json'),
    validCustomer: require('../mocks/valid-customer.json')
}

describe('CarService test suite', () => {
    let carService = {}
    let sandbox = {}
    
    before(() => {
        carService = new CarService({
            cars: carsDatabase
        })
    })

    beforeEach(() => {
        sandbox = sinon.createSandbox()
    })
    afterEach(() => {
        sandbox.restore()
    })

    it('should retrieve a random position form an array', () => {
        const data = [0, 1, 2, 3, 4]
        const result = carService.getRandomPositionFromArray(data)

        expect(result).to.be.lte(data.length).and.be.gte(0)
    })

    it('should choose the first id from carIds in carCategory', () => {
        const carCategory = mocks.validCarCategory
        const carIndex = 0

        sandbox.stub(
            carService,
            carService.getRandomPositionFromArray.name
        ).returns(carIndex)

        const result = carService.chooseRandomCar(carCategory)
        const expected = carCategory.carIds[carIndex]

        expect(carService.getRandomPositionFromArray.calledOnce).to.be.ok
        expect(result).to.be.equal(expected)
    })

    it('given a car category, a customer and the number of days it should calculate the final amount in BRL', () => {
        // Arrange
        const customer = Object.create(mocks.validCustomer)
        customer.age = 50

        const carCategory = Object.create(mocks.validCarCategory)
        carCategory.price = 37.6

        const numberOfDays = 5
        const expected = carService.currencyFormat.format(244.4)

        sandbox.stub(
            carService,
            "taxesBasedOnAge"
        ).get(() =>[{from: 40, to: 50, then: 1.3}])

        // Act
        const result = carService.calculateFinalPrice(
            customer,
            carCategory,
            numberOfDays
        )

        // Assert
        expect(result).to.be.deep.equal(expected)
    })

    it('given a customer and a car category it should return a transaction receipt', async () => {
        // Arrange
        const car = mocks.validCar
        const carCategory = {
            ...mocks.validCarCategory,
            price: 37.6,
            carIds: [car.id]
        }
        const customer = Object.create(mocks.validCustomer)
        customer.age = 20

        const numberOfDays = 5
        const dueDate = "10 de novembro de 2020"
        
        const now = new Date(2020, 10, 5)
        sandbox.useFakeTimers(now.getTime())
        
        sandbox.stub(
            carService.carRepository,
            carService.carRepository.find.name
        ).resolves(car)

        const expectedAmount = carService.currencyFormat.format(206.8)

        // Act
        const result = await carService.rent(customer, carCategory, numberOfDays)
        const expected = new Transaction({
            customer,
            car,
            amount: expectedAmount,
            dueDate
        })

        // Assert
        expect(result).to.be.deep.equal(expected)
    })

    it('given a car category it should return an available car', async () => {
        // Arrange
        const car = mocks.validCar
        const carCategory = Object.create(mocks.validCarCategory)
        carCategory.carIds = [car.id]
        
        sandbox.stub(
            carService.carRepository,
            carService.carRepository.find.name
        ).resolves(car)

        sandbox.spy(
            carService,
            carService.chooseRandomCar.name
        )

        // Act
        const result = await carService.getAvailableCar(carCategory)
        const expected = car

        // Assert
        expect(carService.chooseRandomCar.calledOnce).to.be.ok
        expect(carService.carRepository.find.calledWithExactly(car.id)).to.be.ok
        expect(result).to.be.deep.equal(expected)
    })
})