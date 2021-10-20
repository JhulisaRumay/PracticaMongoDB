const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');
const {getLibros, agregarLibro, actualizarLibro, eliminarLibro, busquedaLibro} = require('../controllers/libro.controller');


const router = Router();

router.get('/', getLibros);


router.post('/', [
        validarJWT,
        check('titulo', 'El titulo del libro es obligatorio').not().isEmpty(),
        check('autor', 'El id del autor debe ser válido').isMongoId(),
        validarCampos
    ],
    agregarLibro);

router.put('/:id', [
        validarJWT,
        check('titulo', 'El titulo del libro es obligatorio').not().isEmpty(),
        check('autor', 'El id del autor debe ser válido').isMongoId(),
        validarCampos
    ],
    actualizarLibro);

router.delete('/:id',
    validarJWT,
    eliminarLibro);

router.get('/:idusuario/autor/:idautor/:ideditorial',[
    validarJWT,
    check('usuario', 'El id del usuario no es válido').isMongoId(),
    check('autor', 'El id del autor no es valido').isMongoId(),
    check('editorial', 'El id de la editorial no es valido').isMongoId(),
    ],
    busquedaLibro);

module.exports = router;