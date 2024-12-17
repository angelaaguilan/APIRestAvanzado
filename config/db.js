const { Pool } = require("pg");

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    password: "bd2024",
    database: "joyas",
    port: 5432,
    allowExitOnIdle: true
});


module.exports = { pool }