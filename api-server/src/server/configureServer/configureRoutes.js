const express = require('express');
const path = require('path');
const logger = require('../../logger');

const { warn, info, err } = logger.createChannel("config-routes");

const { routers } = require('../../routes');

function configureRoutes(app, config){
    info("configuring static routes");

    let staticPath = "";
    staticPath = path.resolve(__dirname, '../../../../public');
    info(`configuring / to serve from: ${staticPath}`);
    app.use('/', express.static(staticPath));


    routers.forEach(([ baseRoute, configureRoutes ]) => {
        info(`configuring routes for ${baseRoute}`);
        let router = express.Router();
        configureRoutes(router, app, config);
        app.use(baseRoute, router);
    });
}

module.exports = configureRoutes;