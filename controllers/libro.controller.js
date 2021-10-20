const { response } = require('express');
const Libro = require('../models/libro.model');

const getLibros = async(req, res = response) => {

    const libros = await Libro.find().
                                        populate('autor', 'nombre apellido pais').
                                        populate('editorial', 'nombre pais').
                                        populate('usuario', 'nombre role');
    res.json({
        ok:true,
        libros:libros
    });
}
const agregarLibro = async(req, res = response) => {
    const uid = req.uid;

    const {nombre, autor} = req.body;
   

    try {

        const existeLibro = await Libro.findOne({nombre, autor});
        if(existeLibro){
            return res.status(400).json({
                ok:false,
                msg:'El libro ya ha sido registrado'
            });
            
        }

        const libro = new Libro({
            autor: uid,
            ...req.body
        });
       
       //registrando el libro en la BD
        const libroBD = await libro.save();


        res.json({
            ok: true,
            libro: libroBD
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({

            ok: false,
            msg: 'Error al agregar el libro'
        });
    }


}
const actualizarLibro = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const libro = await Libro.findById(id);
        if (!libro) {
            return res.status(404).json({
                ok: true,
                msg: 'Este libro no existe'

            });
        }

        const cambiosLibro = {
            ...req.body,
            autor: uid
        }

        const libroActualizado = await Libro.findByIdAndUpdate(id, cambiosLibro, { new: true });

        return res.json({
            ok: true,
            libro: libroActualizado

        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error, no puede actualizar el libro'
        });
    }


}
const eliminarLibro = async(req, res = response) => {
    const id = req.params.id;

    try {

        const libro = await Libro.findById(id);
        if (!libro) {
            return res.status(404).json({
                ok: true,
                msg: 'Libro no existe'

            });
        }

        await Libro.findByIdAndDelete(id);
        return res.json({
            ok: true,
            msg: 'Libro Eliminado'

        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error, no puede eliminar el libro'
        });
    }
}
//aqui hacer una consulta de 3 parametros
const busquedaLibro = async(req,res=response) =>{

    const idusuario = req.params.idusuario;
    const idautor = req.params.idautor;
    const ideditorial = req.params.ideditorial;
 

    try {
        

        const existeLibro = await Libro.find({idusuario,idautor,ideditorial});

        if(!existeLibro){
            return res.status(400).json({
                ok: false,
                msg: 'No existe un libro que conincida con la búsqueda'
            });
        }

        res.json({
            ok:true,
            libro:existeLibro
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'No es posible encontrar el libro'
        })
    }
}
module.exports = {
    getLibros,
    agregarLibro,
    actualizarLibro,
    eliminarLibro,
    busquedaLibro
}