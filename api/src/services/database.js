const { Pool } = require('pg');

async function connect() {
    if (global.connection)
        return global.connection.connect();
 
    const pool = new Pool({
        connectionString: 'postgres://postgres:postgres@postgres:5432/postgres'
    });
 
    global.connection = pool;
    return pool.connect();
}

async function query(query, values=[]) {
    const client = await connect(); 
    const res = await client.query(query, values);
    client.release();
    return res.rows;
}

module.exports={query}