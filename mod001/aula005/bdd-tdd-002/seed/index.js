const Car = require('./../src/entities/car')
const Customer = require('./../src/entities/customer')
const CarCategory = require('./../src/entities/carCategory')
const faker = require('faker')
const {join} = require('path')
const {writeFile} = require('fs/promises')
const ITEMS_AMOUNT = 2

const seederBaseFolder = join(__dirname, '../', 'database')

const carCategory = new CarCategory({
    id: faker.random.uuid(),
    name: faker.vehicle.type(),
    carIds: [],
    price: faker.finance.amount(20, 100)
})

const cars = []
const customers = []

for(let index = 0; index <= ITEMS_AMOUNT; index++){
    const car = new Car({
        id: faker.random.uuid(),
        name: faker.vehicle.model(),
        available: true,
        gasAvailable: true,
        releaseYear: faker.date.past().getFullYear()
    })

    carCategory.carIds.push(car.id)
    cars.push(car)

    const customer = new Customer({
        id: faker.random.uuid(),
        name: faker.name.findName(),
        age: faker.random.number({min: 18, max: 50})
    })
    customers.push(customer)
}

const write = (fileName, data) => writeFile(join(seederBaseFolder, fileName), JSON.stringify(data))

;(async () => {
    await write('cars.json', cars)
    await write('customers.json', customers)
    await write('carCategories.json', [carCategory])

    console.log('Cars: ', cars)
    console.log('Customers: ', customers)
    console.log('CarCategory: ', carCategory)

    console.log('Seeding finished!')
})()