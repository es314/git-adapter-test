const configureRoutes = require('./configureRoutes');

function configureServer(app, config) {
    configureRoutes(app, config);
}

module.exports = configureServer;