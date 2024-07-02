const express = require('express');
const { conectarBD } = require('./server.ts');

const app = express();

// Conectar a la base de datos al iniciar la aplicación
conectarBD()
    .then(() => {
        // Lógica adicional de la aplicación Express aquí
        app.listen(3000, () => {
        console.log('Servidor iniciado en http://localhost:3000');
        });
    })
    .catch((err: Error) => {
        console.error('Error al conectar a la base de datos:', err.message);
    });
