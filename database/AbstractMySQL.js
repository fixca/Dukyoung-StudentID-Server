const mysql = require('mysql');
class AbstractMySQL {

    constructor(databaseName, database) {
        this.databaseName = databaseName;
        this.database = database;
        this.mysqlConnection = this.handleDisconnect();
        const connect = () => {
            this.mysqlConnection = this.handleDisconnect();
            this.mysqlConnection.connect(function (err) {
                if (err) {
                    console.log(`Error has occurred while connecting database (${databaseName})`, err);
                    setTimeout(connect(), 2000);
                }
                else {
                    console.log(`Successfully connected with database (${databaseName})`);
                }
            });
    
            this.mysqlConnection.on('error', function (err) {
                console.log(`Database(${databaseName}) disconnected. Try reconnecting...`);
                connect();
            });
        }
        this.mysqlConnection.connect(function (err) {
            if (err) {
                console.log(`Error has occurred while connecting database (${databaseName})`, err);
                setTimeout(connect(), 2000);
            }
            else {
                console.log(`Successfully connected with database (${databaseName})`);
            }
        });

        this.mysqlConnection.on('error', function (err) {
            console.log(`Database(${databaseName}) disconnected. Try reconnecting...`);
            connect();
        });
    }
    
    query = (dbQuery) => {
        return new Promise((resolve, reject) => {
            this.mysqlConnection.query(dbQuery, (error, results, fields) => {
                if (error) {
                    console.log(error);
                }
                else {
                    resolve(results);
                }
            });
        });
    }

    handleDisconnect = () => {
        let mysqlConnection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: this.database,
            port: 3306
        });
        return mysqlConnection;
    }
}


module.exports = AbstractMySQL;