'use strict';

const Hapi = require('@hapi/hapi');
const mongoose = require('mongoose');
const MongoDB_URL = 'mongodb+srv://dhiraj:dhiraj@cluster0.ocvoq.mongodb.net/test?retryWrites=true&w=majority';

const init = async () => {

    const server = Hapi.server({
        port: process.env.PORT || 3000,
        host: process.env.HOST || 'localhost'
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {

            return 'Hello World!';
        }
    });

    await server.start();
    mongoose.connect(process.env.MongoDB_URL || MongoDB_URL, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }, (error) => {
        if (!error) {
            console.log('mongodb default connection open to mongodb://27017', process.env.PORT, process.env.MongoDB_URL);
        } else {
            console.log('mongoose default connection error' + JSON.stringify(error, undefined, 2));
        }
    });
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();