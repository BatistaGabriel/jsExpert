const http = require('http')

const routes = {
    '/contact:get': (request, response) =>{
        response.write('Hello there send us a detonation request!')
        return response.end()
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