const express = require('express');
const path = require('path');
const logger = require('../../logger');

const rootStaticPath = path.resolve(__dirname, '../../../public');
const { warn, info, err } = logger.createChannel("config-routes");

const { routers } = require('../../routes');

function configureRoutes(app, config){
    info("configuring static routes");

    info(`configuring / to serve from: ${rootStaticPath}`);
    app.use('/', express.static(rootStaticPath));

    routers.forEach(([ baseRoute, configureRoutes ]) => {
        info(`configuring routes for ${baseRoute}`);
        let router = express.Router();
        configureRoutes(router, app, config);
        app.use(baseRoute, router);
    });
}

module.exports = configureRoutes;