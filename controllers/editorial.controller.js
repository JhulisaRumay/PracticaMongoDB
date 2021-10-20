const { response } = require('express');
const Editorial = require('../models/editorial.model');

const getEditorial = async (req, res) =>{

    const editorial = await Editorial.find().
                                            populate('pais', 'nombre').
                                            populate('usuario', 'nombre email');
    res.json({
        ok:true,
        editorial:editorial
    });
}
const registrarEditorial = async(req, res = response) => {
   
    const uid = req.uid;
    const {nombre} = req.body;


    try {

        const existeEditorial = await Editorial.findOne({nombre});
        if(existeEditorial){
            return res.status(400).json({
                ok:false,
                msg: 'La Editorial ya ha sido registrada'
            });
        }

        const editorial = new Editorial({
            editorial: uid,
            ...req.body
        });
        

         //registrando editorial en la BD
        const editorialBD = await editorial.save();
        
        res.json({
            ok: true,
            editorial: editorialBD
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({

            ok: false,
            msg: 'Error al agregar la editorial'
        });
    }


}
const actualizarEditorial = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const editorial = await Editorial.findById(id);
        if (!editorial) {
            return res.status(404).json({
                ok: true,
                msg: 'Esta editorial no existe'

            });
        }

        const cambiosEditorial = {
            ...req.body,
            pais: uid
        }

        const editorialActualizada = await Editorial.findByIdAndUpdate(id, cambiosEditorial, { new: true });

        return res.json({
            ok: true,
            editorial: editorialActualizada

        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error, no puede actualizar la editorial'
        });
    }


}
const eliminarEditorial = async(req, res = response) => {
    const id = req.params.id;

    try {

        const editorial = await Editorial.findById(id);
        if (!editorial) {
            return res.status(404).json({
                ok: true,
                msg: 'Editorial no existe'

            });
        }

        await Editorial.findByIdAndDelete(id);
        return res.json({
            ok: true,
            msg: 'Editorial Eliminado'

        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error, no puede eliminar la editorial'
        });
    }
}


module.exports = {
    getEditorial,
    registrarEditorial,
    actualizarEditorial,
    eliminarEditorial
}