const { response } = require('express');

const Autor = require('../models/autor.model');

const getAutor = async(req, res = response) => {

    const autor = await Autor.find()
                                .populate('pais','nombre')
                                .populate('usuario','nombre email');


    res.json({
        ok: true,
        autor
    })
}

const crearAutor = async (req, res = response) => {

    const uid = req.uid;
    const {nombre, apellido} = req.body;


    try {

        const existeAutor = await Autor.findOne({nombre,apellido});

        if(existeAutor){
            return res.status(400).json({
                ok:false,
                msg:'El autor ya existe en la base de datos'
            });
        }

        const autor = new Autor({
            autor: uid,
            ...req.body
        });

        //registrando autor en la BD
        const autorBD = await autor.save();

        
        res.json({
            ok: true,
            autor: autorBD
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'No se puede crear autor, consulte con el administrador'
        })
    }


}

const actualizarAutor = async(req, res = response) => {
    
    const id  = req.params.id;
    const uid = req.uid;

    try {
        
        const autor = await Autor.findById( id );

        if ( !autor ) {
            return res.status(404).json({
                ok: true,
                msg: 'Autor no encontrado por id',
            });
        }

        const cambiosAutor = {
            ...req.body,
            autor: uid
        }

        const autorActualizado = await Autor.findByIdAndUpdate( id, cambiosAutor, { new: true } );


        res.json({
            ok: true,
            autor: autorActualizado
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'No se puede actualizar autor, consulte con el administrador'
        })
    }

}

const eliminarAutor = async (req, res = response) => {
   
    const id  = req.params.id;

    try {
        
        const autor = await Autor.findById( id );

        if ( !autor ) {
            return res.status(404).json({
                ok: true,
                msg: 'Autor no encontrado por id',
            });
        }

        await Autor.findByIdAndDelete( id );

        res.json({
            ok: true,
            msg: 'Autor borrado'
        }); 

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Autor no puede eliminarse, consulte con el administrador'
        })
    }

}



module.exports = {
    getAutor,
    crearAutor,
    actualizarAutor,
    eliminarAutor
}