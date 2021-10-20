const {Schema, model} = require('mongoose');


const LectorSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    celular: {
        type: Number,
        required: true
    },
    correo: {
        type: String
    },
    usuario: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }
    
},{collection: 'lectores'});

LectorSchema.method('toJSON', function(){
    const {__v, ...object} = this.toObject();

    return object;
})

module.exports = model('Lector', LectorSchema);