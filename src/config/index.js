const fs = require('fs');
const path = require('path');
const { warn } = require('../logger');

async function loadConfig(envVars = {}) {
    const {
        CONFIG_SRC: configSrc = 'local:src/server.config.json',
        NODE_ENV: nodeEnv = 'DEV',
        PORT: port = 3000,
        SERVER_NAME: serverName = "Example Node.js and ExpressJS Web Server"
    } = envVars;

    let config;

    if(/^local:/i.test(configSrc)){
        let relPath = configSrc.substr(6);
        let localConfigPath = path.resolve(__dirname, '../../', relPath);
        if(fs.existsSync(localConfigPath)){
            let jsonStr = fs.readFileSync(localConfigPath, 'utf8');
            let localConfig = JSON.parse(jsonStr);
            config = {
                port: localConfig.port || port,
                serverName: localConfig.serverName || serverName,
                nodeEnv: localConfig.nodeEnv || nodeEnv
            };
        }else if(nodeEnv !== 'PROD' || nodeEnv !== 'PRODUCTION'){
            warn(`Unable to load config file from Config Source (CONFIG_SRC): ${configSrc} because it points to config file that doesn't exist! Using default config values instead.`)
            config = {
                port,
                serverName,
                nodeEnv
            };
        }else{
            throw new Error(`Unable to load config file from Config Source (CONFIG_SRC): ${configSrc} because it points to config file that doesn't exist!`)
        }
    }else{
        throw new Error(`Invalid Config Source (CONFIG_SRC) specified: ${configSrc}`);
    }

    return config;
}

exports.loadConfig = loadConfig;