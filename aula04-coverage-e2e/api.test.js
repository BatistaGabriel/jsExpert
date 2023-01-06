const {describe, it} = require ('mocha')
const request = require('supertest')
const app = require('./api')
const assert = require('assert')

describe('API Suite Test', () =>{
    describe('/contact', () =>{
        it('should request the contact page and return HTTP Status 200', 
        async()=>{
            const response = await request(app)
                        .get('/contact')
                        .expect(200)
            assert.deepStrictEqual(response.text, 'Hello there send us a detonation request!')
        })
    })

    describe('/hello', () =>{
        it('should request na inexistent route /hi and be redirected to the defult route page and return HTTP Status 200', 
        async()=>{
            const response = await request(app)
                        .get('/hi')
                        .expect(200)
            assert.deepStrictEqual(response.text, 'You Rebel Scum!')
        })
    })

    describe('/login', () =>{
        it('should perform login successfully and return HTTP Status 200', 
        async()=>{
            const response = await request(app)
                        .post('/login')
                        .send({username: "Darth", "password": "123"})
                        .expect(200)
            assert.deepStrictEqual(response.text, 'You are logged in sir!')
        })

        it('should not perform the login with incorrect credentials and return HTTP Status 401', 
        async()=>{
            const response = await request(app)
                        .post('/login')
                        .send({username: "Luke", "password": "Sky123"})
                        .expect(401)
            assert.deepStrictEqual(response.text, 'Invalid Credentials!')
        })
    })
})