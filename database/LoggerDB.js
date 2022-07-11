const AbstractMySQL = require('./AbstractMySQL');

class LoggerDB extends AbstractMySQL {
    
    constructor(className, database) {
        super(className, database);
    }

    static __instance = new LoggerDB("Database", "dukyoung_enterance");

    static getInstance() {
        return this.__instance;
    }
}

module.exports = LoggerDB;