const {response} = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario.model');

//VER USUARIOS
const getUsuarios = async (req, res) =>{

    const usuarios = await Usuario.find({}, 'nombre email role google');
    res.json({
        ok:true,
        usuarios
    });
}

//CREAR USUARIOS
const crearUsuario = async (req, res=response) =>{

    const {email, password, nombre} = req.body;

    try {
        const existeEmail = await Usuario.findOne({email});
        if(existeEmail){
            return res.status(400).json({
                ok:false,
                msg: 'El email ya ha sido registrado'
            });
        }

        //creamos un objeto de la clase model usuario
        const usuario = new Usuario(req.body);

        //encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        //indicamos a mongoose que registrre al usuario en la BD con la contraseña encriptada
        await usuario.save();

        //
        res.json({
            ok:true,
            msg: 'Creando Usuario',
            usuario,
            token
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Error en el servidor, revisar logs'
        });
    }
    
}

//ACTUALIZAR USUARIOS
const actualizarUsuario = async (req, res = response) =>{
    const uid = req.params.id;

    try {
        const usuarioBD = await Usuario.findById(uid);

        if (!usuarioBD){
            return res.status(404).json({
                ok:false,
                msg: 'No existe un usuario con ese id'
            });
        }

        //codigo previo a la actualización
        const {password, google, email, ... campos} = req.body;


        if(usuarioBD.email !== email){
            const existeEmail = await Usuario.findOne({email});
            if(existeEmail){
                return res.status(400).json({
                    ok:false,
                    msg: 'Ya existe un usuario con este email'
                });
            }
        }
        campos.email = email;

        //actualizacion de datos
        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, {new:true});

        
        res.json({
            ok:true,
            usuario: usuarioActualizado
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Error al actualizar usuario'
        });
    }
}

//ELIMINAR USUARIOS

const eliminarUsuario = async(req, res = response) =>{
    const uid = req.params.id;

    try {
        const usuarioBD = await Usuario.findById(uid);
        if(!usuarioBD){
            return res.status(404).json({
                ok:false,
                msg: 'No existe un usuario con ese id'
            });
        }
        await Usuario.findByIdAndDelete(uid);

        res.json({
            ok:true,
            msg: 'Usuario eliminado de la BD'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'No es posible eliminar usuario'
        });
    }
}
    

module.exports ={
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario,
}