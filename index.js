const express = require('express');
const { dbConnection } = require('./database/config');
require('dotenv').config();
const cors = require('cors');

//crear el servidor de express

const app = express();

//conexion a la bd
dbConnection();

//cors
app.use(cors());

//directorio publico
app.use(express.static('public'));

//lectura y parseo del body 
app.use(express.json());

//rutas
/************RUTAS PARA LOGIN Y USUARIOS********** */
app.use('/api/auth', require('./routes/auth'));

/*******************RUTAS PARA LOS EVENTOS DEL CALENDAR********************** */
app.use('/api/events', require('./routes/events'));


app.get('*', (req, res) => {
    res.sendFile(__dirname +'/public/index.html');
});

//escuchar peticiones
app.listen(process.env.PORT, () => {
    console.log('Servidor arriba :) , puerto --> ' + process.env.PORT);
});