const {Schema, model, SchemaTypes} = require('mongoose');

//definicion del esquema para la coleccion de Usuario

const UsuarioSchema = Schema({
    nombre:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    img:{
        type: String
    },
    role:{
        type: String,
        required: true,
        default: 'USER_ROLE'
    },
    google:{
        type: Boolean,
        required:false
    },
});
//Configuracion opcional para cambiar el _id por uid
//Este cambio es solo para fines visuales, la bd permanece con _id
UsuarioSchema.method('toJSON', function(){
    const {__v, _id, password, ...object } = this.toObject();
    object.uid = _id;
    return object;
})
//Exportamos el modelo
//por defecto mongoose creara en mongodb un documento en plural: usuarios

module.exports = model ('Usuario', UsuarioSchema);