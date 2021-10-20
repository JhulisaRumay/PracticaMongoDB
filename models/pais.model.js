const {Schema, model} = require('mongoose');

const paisSchema = Schema({
    nombre:{
        type: String,
        required: true
    },
    
},{collection: 'paises'});

paisSchema.method('toJSON', function(){
    const {__v, ...object} = this.toObject();

    return object;
})

module.exports = model('Pais', paisSchema);