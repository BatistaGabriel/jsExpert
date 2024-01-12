const http = require('node:http')
const {once} = require('node:events')

const DEFAULT_USER = {
    username: 'AdminN', 
    password: '123'
}
const routes = {
    '/contact:get': (request, response) => {
        response.write('contact page')
        
        return response.end()
    },
    '/login:post': async (request, response) => {
        const requestUser = JSON.parse(await once(request, 'data'))
        const toLower = (text) => text.toLowerCase()
        if(toLower(requestUser.username) !== toLower(DEFAULT_USER.username) || 
            requestUser.password !== DEFAULT_USER.password){
            response.writeHead(401)
            response.end('Logging failed!')
            
            return
        }

        return response.end("Login has succeeded!")
    },
    default: (request, response) => {
        response.writeHead(404)
        response.end("Not Found")

        return
    }
}

function handler(request, response){
    const {url, method} = request
    const routeKey = `${url.toLowerCase()}:${method.toLowerCase()}`
    const chosen = routes[routeKey] || routes.default

    return chosen(request, response)
}

const app = http.createServer(handler)
.listen(3000, () => console.log('server running on port 3000'))

module.exports = app