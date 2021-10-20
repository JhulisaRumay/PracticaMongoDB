//busquedaTotal

const { response } = require("express")

const Usuario = require('../models/usuario.model');
const Pais = require('../models/pais.model');
const Libro = require('../models/libro.model');
const Lector = require('../models/lector.model');
const Fichaprestamo = require('../models/fichaPrestamo.model');
const Editorial = require('../models/editorial.model');
const Autor = require('../models/autor.model');



const busquedaTotal = async (req, res=response)=>{

    const busqueda = req.params.busqueda; 
    const miRegExp = new RegExp(busqueda,'i'); //i  insensible

    const [usuarios, paises, libros,lectores,prestamos, editorial, autores] = await Promise.all ([
        Usuario.find({nombre:miRegExp}), // la busqueda es por nombre
        Pais.find({nombre:miRegExp}),
        Libro.find({nombre:miRegExp}),
        Lector.find({nombre:miRegExp}),
        Fichaprestamo.find({fecha_prestamo:miRegExp}),
        Editorial.find({nombre:miRegExp}),
        Autor.find({nombre:miRegExp})
    ]);

    res.json({
        ok: true,
        msg: 'busqueda total',
        usuarios,
        paises,
        libros,
        lectores,
        prestamos,
        editorial,
        autores
    });

}

//estructura de la peticion /coleccion/micoleccion/criteriobusqueda
const busquedaColeccion = async (req, res=response)=>{

    const miColeccion = req.params.micoleccion;
    const busqueda = req.params.busqueda; 
    const miRegExp = new RegExp(busqueda,'i'); //i  insensible

    let data = [];

    switch (miColeccion) {
        case 'usuarios':
            data = await Usuario.find({nombre:miRegExp})
                            
            break;
        case 'paises':
            data = await Pais.find({nombre:miRegExp})

            break;    
        case 'libros':
            data = await Libro.find({nombre:miRegExp})
                    .populate('autor','nombre apellido pais')
                    .populate('editorial','nombre pais')
                    .populate('usuario', 'nombre role');
            break;
        case 'lectores':
            data = await Lector.find({nombre:miRegExp})
                    .populate('usuario', 'nombre');
                    
            break;
        case 'prestamos':
            data = await Fichaprestamo.find({nombre:miRegExp})
                    .populate('lector','nombre  celular')
                    .populate('libro','titulo autor editorial paginas')
                    .populate('usuario', 'nombre email');
            break;
        case 'editorial':
            data = await Editorial.find({nombre:miRegExp})
                    .populate('pais', 'nombre')
                    .populate('usuario', 'nombre email');
            break;
        case 'autores':
            data = await Autor.find({nombre:miRegExp})
                    .populate('pais','nombre')
                    .populate('usuario','nombre email');
            break;
        default:
            return res.status(400).json({
                ok: false,
                msg: "La coleccion tiene que ser usuarios/paises/libros/lectores/prestamos/editorial/autores"
            });
    }
    res.json({
        ok: true,
        resultados: data
    });
    
}

module.exports ={
    busquedaTotal,
    busquedaColeccion
}