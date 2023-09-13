const { Client } = require('pg');

require('dotenv').config();

const client = new Client({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT,
});

client.connect()
    .then(() => {
        console.log('Connected to the PostgreSQL database');
    })
    .catch((err) => {
        console.error('Error connecting to the database:', err);
    });

const userData = {
    firstname: 'Thomas',
    lastname: 'Willson',
    email: 'thomas.willson@epitech.eu',
};

const query = {
    text: 'INSERT INTO User (firstname, lastname, email) VALUES ($1, $2, $3) RETURNING *',
    values: [userData.firstname, userData.lastname, userData.email],
};

client.query(query)
    .then((result) => {
        console.log('Inserted record with ID:', result.rows[0].id);
    })
    .catch((err) => {
        console.error('Error inserting record:', err);
    })
    .finally(() => {
        client.end();
    });
