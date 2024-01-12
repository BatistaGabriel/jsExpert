const {describe, it, after, before} = require('mocha')
const supertest = require('supertest')
const assert = require('node:assert')

describe('API Suite Test', () => {
    let app
    before((done) =>{
        app = require('./api')
        app.once('listening', () => done())
    })
    
    after(done => app.close(done))

    describe('/contact:get', () => {
        it('should return an HTTP status 200 for each correct request to contact route', async() => {
            const response = await supertest(app)
                .get('/contact')
                .expect(200)
            
            assert.ok(response.ok)
            assert.strictEqual(response.text, 'contact page')
        })
    })

    describe('/login:post', () => {
        it('should return an HTTP status 200 for each correct request to login route', async() => {
            const response = await supertest(app)
                .post('/login')
                .send({username: 'adminn', password: '123'})
                .expect(200)

            assert.ok(response.ok)
            assert.strictEqual(response.text, 'Login has succeeded!')
        })

        it('should return an HTTP status 401 for each incorrect request to login route', async() => {
            const response = await supertest(app)
                .post('/login')
                .send({username: 'admin', password: '123'})
                .expect(401)
            
            assert.ok(response.unauthorized)
            assert.strictEqual(response.text, 'Logging failed!')
        })
    })

    describe('unexisting route', () => {
        it('should return an HTTP status 404 for each request to an unexisting route', async() => {
            const response = await supertest(app)
                .get('/test')
                .expect(404)

            assert.ok(response.notFound)
            assert.strictEqual(response.text, 'Not Found')
        })
    })
})