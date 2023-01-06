const http = require('http')
const DEFAULT_USER = {username: "Darth", password: "123"}

const routes = {
    '/contact:get': (request, response) =>{
        response.write('Hello there send us a detonation request!')
        // response is an iterator!
        return response.end()
    },
    '/login:post': async(request, response) =>{
        for await (const data of request){
            const user = JSON.parse(data)
            if(
                user.username !== DEFAULT_USER.username ||
                user.password !== DEFAULT_USER.password
            ){
                response.writeHead(401)
                response.write('Invalid Credentials!')
                return response.end()
            }
            
            response.write('You are logged in sir!')
            return response.end()
        }
    },
    default: (request, response) => {
        response.write('You Rebel Scum!')
        return response.end()
    }
}

const handler = function (request, response){
    const {url, method} = request
    const routeKey = `${url}:${method.toLowerCase()}`
    const chosen = routes[routeKey] || routes.default

    response.writeHead(200, {
        'Content-Type':'text/html'
    })

    return chosen(request, response)
}

const app = http.createServer(handler)
                .listen(3000, () => console.log('Up and Running at', 3000))

module.exports = app