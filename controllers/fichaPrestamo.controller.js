const { response } = require('express');
const Prestamo = require('../models/fichaPrestamo.model');

const getPrestamo = async(req, res = response) => {
    const prestamo = await Prestamo.find().
                                            populate('lector', 'nombre celular').
                                            populate('libro', 'titulo autor editorial paginas').
                                            populate('usuario', 'nombre email');

    res.json({
        ok: true,
        prestamo:prestamo
    });
}
const crearPrestamo = async(req, res = response) => {
    const uid = req.uid;

    const prestamo = new Prestamo({
        usuario: uid,
        ...req.body
    });

    try {

        const prestamoBD = await prestamo.save();
        res.json({
            ok: true,
            prestamo: prestamoBD
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({

            ok: false,
            msg: 'Error inesperado hablar con el administrador'
        });
    }
}
const actualizarPrestamo = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const prestamo = await Prestamo.findById(id);
        if (!prestamo) {
            return res.status(404).json({
                ok: true,
                msg: 'Préstamo no existe en la BD'

            });
        }

        const cambiosPrestamo = {
            ...req.body,
            usuario: uid
        }

        const prestamoActualizado = await Prestamo.findByIdAndUpdate(id, cambiosPrestamo, { new: true });

        return res.json({
            ok: true,
            prestamo: prestamoActualizado

        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado hable con el administrador'
        });
    }
}
const eliminarPrestamo = async(req, res = response) => {
    const id = req.params.id;

    try {

        const prestamo = await Prestamo.findById(id);
        if (!prestamo) {
            return res.status(404).json({
                ok: true,
                msg: 'Préstamo no existe'

            });
        }

        await Prestamo.findByIdAndDelete(id);
        return res.json({
            ok: true,
            msg: 'Préstamo eliminado'

        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado hable con el administrador'
        });
    }
}


const busquedaPrestamo = async(req,res=response) =>{

    const idusuario = req.params.idusuario;
    const idlector = req.params.idlector;
    const idlibro = req.params.idlibro;
    const idautor = req.params.idautor;

    try {
        

        const existePrestamo = await Prestamo.find({idusuario,idlector,idlibro,idautor});

        if(!existePrestamo){
            return res.status(400).json({
                ok: false,
                msg: 'No existe una ficha de prestamo que conincida con la búsqueda'
            });
        }

        res.json({
            ok:true,
            prestamo:existePrestamo
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'No es posible encontrar la ficha de préstamo de libros'
        })
    }
}

module.exports = {
    getPrestamo,
    crearPrestamo,
    actualizarPrestamo,
    eliminarPrestamo,
    busquedaPrestamo
}