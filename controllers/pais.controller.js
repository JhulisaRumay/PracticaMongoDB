const { response } = require('express');
const Pais = require('../models/pais.model');

const getPais = async(req, res = response) => {

    const paises = await Pais.find({}, 'nombre');
    res.json({
        ok:true,
        paises:paises
    });
}
const agregarPais = async(req, res = response) => {
 

    const {nombre} = req.body;

    try {

        const existePais = await Pais.findOne({nombre});
        if(existePais){
            return res.status(400).json({
                ok:false,
                msg: 'El pais ya ha sido registrado'
            });
        }

        //creamos un objeto de la clase model pais
        const pais = new Pais(req.body);

        //registrabdi pais en la BD
        const paisBD = await pais.save();

        res.json({
            ok: true,
            pais: paisBD
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({

            ok: false,
            msg: 'Error al agregar el país'
        });
    }


}
const actualizarPais = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const pais = await Pais.findById(id);
        if (!pais) {
            return res.status(404).json({
                ok: true,
                msg: 'Este pais no existe'

            });
        }

        const cambiosPais = {nombre} = req.body;

        const paisActualizado = await Pais.findByIdAndUpdate(id, cambiosPais, { new: true });

        return res.json({
            ok: true,
            pais: paisActualizado
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error, no puede actualizar el paìs'
        });
    }


}
const eliminarPais = async(req, res = response) => {
    const id = req.params.id;

    try {

        const pais = await Pais.findById(id);
        if (!pais) {
            return res.status(404).json({
                ok: true,
                msg: 'Paìs no existe'

            });
        }

        await Pais.findByIdAndDelete(id);
        return res.json({
            ok: true,
            msg: 'Paìs Eliminado'

        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error, no puede eliminar el paìs'
        });
    }
}


module.exports = {
    getPais,
    agregarPais,
    actualizarPais,
    eliminarPais
}