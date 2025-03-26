require("reflect-metadata");
const { DataSource } = require("typeorm");
const { Users } = require("../entities/users");
const { Cryptos } = require("../entities/cryptos");

module.exports = {
    AppDataSource: new DataSource({
        type: "postgres",
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT, 10),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: [Users, Cryptos],
    }),
};