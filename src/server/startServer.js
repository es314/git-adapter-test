const Promise = require('bluebird');
const { info } = require('../logger');

function startServer(app, config){
    return new Promise((resolve, reject) => {
        app.listen(config.port, (err) => {
            if(err){
                reject(err);
                return;
            }else{
                info(`${config.serverName} started on http://localhost:${config.port}`);
                resolve(app);
                return;
            }
        });
    });
}

module.exports = startServer;