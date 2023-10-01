'use strict'

const http = require('http');
const EventEmitter = require('events')

const PORT = 5000;
module.exports = class Application{
    constructor() {
        this.emitter = new EventEmitter();
        this.server = this._createServer();
        this.middlewares = [];
    }
    _createServer(){
        return http.createServer((req, res) => {
            let body = ""
            req.on('data', (chunk) => {
               body+=chunk;
            })
            req.on('end', () => {
                if(body){
                    req.body = JSON.parse(body);
                }
                this.middlewares.forEach(middleware => middleware(req, res));
                const { url, method } = req;
                const emitted = this.emitter.emit(this._getRouterMask(req.pathname, method), req, res);
                if(!emitted){
                    res.end('404');
                }
            })
        })
    }
    _getRouterMask(path, method){
        return `[${path}]:[${method}]`;
    }

    use(middleware){
        this.middlewares.push(middleware);
    }
    addRouter(router){
        Object.keys(router.endpoints).forEach(path => {
            const endpoint = router.endpoints[path];
            Object.keys(endpoint).forEach(method => {
                const handler = endpoint[method];
                this.emitter.on(this._getRouterMask(path, method), (req, res) => {
                    return handler(req, res);
                });
            })
        })
    }
    listen(port, callback){
        return this.server.listen(port, callback);
    }
}

