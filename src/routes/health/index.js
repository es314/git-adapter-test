const logger = require('../../logger');
const { warn, info, err } = logger.createChannel('config-routes/health');

function configureHealthRoutes(router, app, config){
    
    info("configuring route GET /");
    router.get('/', (reg, res) => {
        res.status(200).send(`${config.serverName} OK`);
    })
}

module.exports = configureHealthRoutes;