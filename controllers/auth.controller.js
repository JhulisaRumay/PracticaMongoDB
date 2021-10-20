const {response} = require ('express');
const bcrypt = require('bcryptjs');
const Usuario = require ('../models/usuario.model');
const {generarJWT} = require('../helpers/jwt')

const login = async(req,res = response) =>{
    const {email, password} = req.body;
    
    try {
         //verificar al usuario ppor su email
         const usuarioBD = await Usuario.findOne({email});
        if (!usuarioBD){
            return res.status(404).json({
                ok:false,
                msg: 'Email no encontrado'
                
            });
        }
        //verificar contraseña

        const validPassword = bcrypt.compareSync(password, usuarioBD.password);
        if( !validPassword){
            return res.status(400).json({
                ok:false,
                msg: 'Contraseña no válida'
            });
        }

        //generar el TOKEN - JWT
        const token = await generarJWT(usuarioBD.id);

        res.json({
            ok:true,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Comunicarse con el administrador'
        })
        
    }
}
const renewToken = async(req, res = response) => {

    const uid = req.uid;
    const token = await generateJWT(uid);

    res.json({
        ok: true,
        token
    });
}
module.exports = {
    login,
    renewToken
}