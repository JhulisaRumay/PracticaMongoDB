const express = require('express'); //para importar en node
require('dotenv').config(); //para usar env desde node
const {dbConection} = require('./config/database');
const cors = require('cors') //importamos cors 

//creando el servidor express
const app = express();

//Configuración de CORS
app.use(cors());

//Conexion a la BD
dbConection();

//RUTAS DE LA API
app.get ('/', (req, res) =>{
    res.json({
        ok:true,
        msg: 'Bienvenidos a Node'
    });
})

//para levantar el servidor
app.listen(process.env.PORT, () =>{
    console.log('Servidor corriendo en el puerto ' + process.env.PORT)
})