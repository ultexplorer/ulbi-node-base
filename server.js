'use strict';
const mongoose = require('mongoose');
const PORT = 5000;
const userRouter = require('./src/user-routes')
const Application = require('./framework/Application')
const app = new Application();
const jsonParser = require('./framework/parsejson')
const parseUrl = require('./framework/parseUrl')
app.use(jsonParser);
app.use(parseUrl('http://localhost'));
app.addRouter(userRouter);



const start = async () => {
    try {
        await mongoose.connect('mongodb+srv://ultexplorer:Praga2023@cluster1.qrcpmgc.mongodb.net/?retryWrites=true&w=majority');
        app.listen(PORT, () => console.log(`Server listening PORT:${PORT}`));
    }catch(e){
        console.log(e);
    }
}

(async () => {
    await start();
})()