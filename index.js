const express = require('express'); //para importar en node
require('dotenv').config(); //para usar env desde node
const {dbConection} = require('./config/database');
const cors = require('cors') //importamos cors 

//creando el servidor express
const app = express();

//Configuración de CORS
app.use(cors());

//Lectura y parseo del body
app.use(express.json());

//Conexion a la BD
dbConection();

//RUTAS DE LA API
app.use('/api/usuarios', require('./routes/usuarios.route'));
app.use('/api/lectores', require('./routes/lector.route'));
app.use('/api/libros', require('./routes/libro.route'));
app.use('/api/autores', require('./routes/autor.route'));
app.use('/api/ficha', require('./routes/fichaPrestamo.route'));
app.use('/api/editorial', require('./routes/editorial.route'));
app.use('/api/pais', require('./routes/pais.route'));
app.use('/api/todo', require('./routes/busqueda.route'));
app.use('/api/login', require('./routes/auth.route'));


//para levantar el servidor
app.listen(process.env.PORT, () =>{
    console.log('Servidor corriendo en el puerto ' + process.env.PORT)
})