const mysql = require('mysql')
class DatabaseModel {
    constructor() {
        this.host = '127.0.0.1';
        this.user = 'root';
        this.password = '123456@Abc';
        this.database = 'classicmodels';
    }

    connect() {
        return mysql.createConnection({
            host: this.host,
            user: this.user,
            password: this.password,
            database: this.database
        })
    }
}

module.exports = new DatabaseModel()
