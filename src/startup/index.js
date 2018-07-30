const { loadConfig } = require('../config');
const { createServer, startServer, configureServer } = require('../server');
const { initLogger, configureLogger } = require('../logger');

//initialize any environment variables that need to be passed to config
const PORT = process.env.PORT || 3000;

async function startup() {

    console.log("Starting up server...");
    console.log("Initializing logger with default settings");
    //first initialize the logger with defaults
    let logger = initLogger();
    let { info, warn, err } = logger.createChannel("server-startup");
    
    info("loading server config");
    //next load the config possibly from an external service
    let config = await loadConfig({ PORT });

    info("configuring logger with server config settings");
    //next configure the logger with the config settings
    configureLogger(config);

    info("creating the web server framework");
    //next create the express framework
    let app = createServer(config);
    
    info("configuring the web server framework");
    //next configure server with its middleware and routes
    configureServer(app, config);
    
    info("starting the web server framework");
    //finally start the server
    await startServer(app, config);
}

exports.startup = startup;