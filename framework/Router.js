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
        //emitter.on(`[${path}]:[${method}]`, handler)
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

module.exports = Router
