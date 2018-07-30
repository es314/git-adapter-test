
let logger = {
    createChannel,
    initLogger,
    configureLogger,
    warn,
    err,
    info
};

function err(msg, channelName = "default"){
    console.error(`[${channelName}] - ${msg}`);
}

function warn(msg, channelName = "default"){
    console.warn(`[${channelName}] - ${msg}`);
}

function info(msg, channelName = "default"){
    console.log(`[${channelName}] - ${msg}`);
}

function initLogger(){
    return logger;
}

function configureLogger(config){
    console.log("Configuring logger...");
}

function createChannel(channelName){
    return {
        warn: (msg) => { warn(msg, channelName) },
        info: (msg) => { info(msg, channelName) },
        err: (msg) => { err(msg, channelName) },
    };
}

module.exports = logger;
