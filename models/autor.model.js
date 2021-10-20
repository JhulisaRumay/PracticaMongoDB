const {Schema, model} = require('mongoose');

const autorSchema = Schema({
    nombre:{
        type: String,
        required: true
    },
    apellido:{
        type: String,
        required: true
    },
    pais:{   
        type: Schema.Types.ObjectId,
        ref: 'Pais',  
        required: true,
    },
    usuario:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true,
    }
},{collection: 'autores'});

autorSchema.method('toJSON', function(){
    const {__v, ...object} = this.toObject();

    return object;
})

module.exports = model('Autor', autorSchema);