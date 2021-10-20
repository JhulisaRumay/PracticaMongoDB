const {response} = require('express');
const Lector = require('../models/lector.model');

//VER LECTORES
const getLector = async (req, res) =>{

    const lectores = await Lector.find().
    populate('usuario', 'nombre');
    res.json({
        ok:true,
        lectores:lectores
    });
}

//CREAR LECTORES
const crearLector = async (req, res=response) =>{

    const uid = req.uid;
    const {correo} = req.body;

    
    try {

        const existeEmail = await Lector.findOne({correo});
        if(existeEmail){
            return res.status(400).json({
                ok:false,
                msg: 'Este email ya ha sido registrado, por lo que indica que el lector ya se encuentra en la BD'
            });
        }


        const lector = new Lector({
            usuario: uid,
            ...req.body
        });

        //registrando lector en la BD

        const lectorBD = await lector.save();


        //guardando a la BD
        res.json({
            ok:true,
            lector: lectorBD
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Error en el servidor, comunicarse con el administrador'
        });
    }
    
}

//ACTUALIZAR LECTORES
const actualizarLector = async (req, res = response) =>{
    const uid = req.params.id;

    try {
        const lectorBD = await Lector.findById(uid);

        if (!lectorBD){
            return res.status(404).json({
                ok:false,
                msg: 'No existe un lector con ese id'
            });
        }

        //codigo previo a la actualización
        const cambiosLector ={...req.body,usuario:uid}

        //actualizacion de datos
        const lectorActualizado = await Lector.findByIdAndUpdate(uid, cambiosLector, {new:true});

        
        res.json({
            ok:true,
            lector: lectorActualizado
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Error al actualizar lector'
        });
    }
}

//ELIMINAR LECTORES

const eliminarLector = async(req, res = response) =>{
    const uid = req.params.id;

    try {
        const lectorBD = await Lector.findById(uid);
        if(!lectorBD){
            return res.status(404).json({
                ok:false,
                msg: 'No existe un lector con ese id'
            });
        }
        await Lector.findByIdAndDelete(uid);

        res.json({
            ok:true,
            msg: 'Lector eliminado de la BD'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'No es posible eliminar al lector'
        });
    }
}
    

module.exports ={
    getLector,
    crearLector,
    actualizarLector,
    eliminarLector,
}