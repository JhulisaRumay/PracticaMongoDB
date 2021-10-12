const mongoose = require('mongoose');

const dbConection = async() =>{
    try {
        //debemos utilizar la cadena de conexión que tenemos en mongocompass
        await mongoose.connect(process.env.DB_CNN);
        console.log('Conexión exitosa a la BD')
    } catch (error) {
        console.log(error);
        throw new Error('Error al conectar la BD');
    }
}
module.exports ={
    dbConection
}