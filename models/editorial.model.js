const {Schema, model} = require('mongoose');

const editorialSchema = Schema({
    nombre:{
        type: String,
        required: true
    },
    direccion:{
        type: String,      
    },
    pais:{
        type: Schema.Types.ObjectId,
        ref: 'Pais',
        required: true
    },
    usuario:{
        
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
   
},{collection: 'editorial'});

editorialSchema.method('toJSON', function(){
    const {__v, ...object} = this.toObject();

    return object;
})

module.exports = model('Editorial', editorialSchema);