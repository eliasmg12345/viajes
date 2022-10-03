import express from 'express';
import router from "./routes/index.js";
import db from "./config/db.js";

import * as dotenv from 'dotenv';
dotenv.config({ path: 'variables.env' });


//require('dotenv').config({ path: 'variables.env' })

const app = express();

//conectar la bd
db.authenticate()
    .then(() => console.log('bd conectada'))
    .catch(error => console.log(error));


//habilitar pug
app.set('view engine', 'pug');

//Obtener el año actual-...por variables internas de express
app.use((req, res, next) => {
    const year = new Date();
    res.locals.actualYear = year.getFullYear();
    res.locals.nombreSitio = 'Agenciad de Viajes |';
    next();
});

//Agregar body parser para leer los datos del formulario
app.use(express.urlencoded({ extended: true }));


//definir la carpeta publica
app.use(express.static('public'));

//agregar router
app.use('/', router);

//puerto y host para la aopp
const host = process.env.HOST || '0.0.0.0';
//heroku va asignar a PORT
const port = process.env.PORT || 4000;



app.listen(port,host, () => {
    console.log(`el servidor esta duncionando en ${port}`);
});