const express = require('express');

function createServer(config){
    let app = express();
    return app;
}

module.exports = createServer;