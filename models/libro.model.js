const {Schema, model} = require('mongoose');

const libroSchema = Schema({
    titulo:{
        type: String,
        required: true
    },
    edicion:{
        type: Number
    },
    paginas:{
        type: Number,      
    },
    autor:{
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Autor'
    },
    editorial:{
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Editorial'
    },
    usuario:{
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }
   
},{collection: 'libros'});

libroSchema.method('toJSON', function(){
    const {__v, ...object} = this.toObject();

    return object;
})

module.exports = model('Libro', libroSchema);