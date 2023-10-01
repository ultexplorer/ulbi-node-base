'use strict';

const http = require('http');
const path = require('path');
const fs = require('fs');
const EventEmitter = require('events');

const PORT = 5000;

const emitter = new EventEmitter();

class Router {
    constructor(){
        this.endpoints = {};
    }
    request(path, method, handler){
        if(!this.endpoints[path]){
            this.endpoints[path] = {};
        }
        const endpoint = this.endpoints[path];
        if(endpoint[method]){
            throw new Error(`${method} on ${path} already exists!`)
        }
        endpoint[method] = handler;
        emitter.on(`[${path}]:[${method}]`, handler)
        return endpoint;
    }
    get(path, handler){
        this.request(path, 'GET', handler);
    }
    post(path, handler){
        this.request(path, 'POST', handler);
    }
    put(path, handler){
        this.request(path, 'PUT', handler);
    }
    delete(path, handler){
        this.request(path, 'DELETE', handler);
    }
}

const router = new Router();

const handler = (req, res) => {
    let { url, method } = req;
    if(method === 'GET'){

        res.end(`page on  url = ${url}`);
    }
}

router.get('/', handler);
router.get('/user', handler);

const server = http.createServer((req, res) => {
    const { url, method } = req;
    const emitted = emitter.emit(`[${url}]:[${method}]`, req, res)
    if(!emitted){
        res.end('404');
    }
})

server.listen(PORT, () => console.log(`SERVER LISTENING ${PORT}`))
