const { Schema, model } = require('mongoose');

//Definicion de las colecciones en mongoose (definicion del esquema de bd)
const FichaSchema = Schema({
   
    fecha_prestamo: {
        type: String,
        required: true
    },
    fecha_devolucion: {
        type: String,
        required: true
    },
    lector: {
        type: Schema.Types.ObjectId,
        ref: 'Lector',
        required: true
    },
    libro: {
        type: Schema.Types.ObjectId,
        ref: 'Libro',
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
    
}, { collection: 'prestamos' }); // codigo utilizado para asignar el nombre de la colleccion en mongodb

FichaSchema.method('toJSON', function() {
    //codigo para modificar el _id por default por uid pero solo para visualizacion en 
    //la base de datos seguira igual
    const { __v, ...object } = this.toObject();

    return object;

})

//para poder exponer esta definicion  para que pueda ser utilizado desde fuera
module.exports = model('Prestamos', FichaSchema);