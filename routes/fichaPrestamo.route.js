/*
ruta: /api/ficha
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const {getPrestamo,crearPrestamo,actualizarPrestamo,eliminarPrestamo,busquedaPrestamo} = require('../controllers/fichaPrestamo.controller');

const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();

router.get('/', getPrestamo);


router.post('/', [
        validarJWT,
        check('lector', 'El id del lector debe ser válido').isMongoId(),
        check('libro', 'El id del libro debe ser valido').isMongoId(),
        validarCampos
    ],
    crearPrestamo);

router.put('/:id', [
        validarJWT,
        check('lector', 'El id del lector debe ser válido').isMongoId(),
        check('libro', 'El id del libro debe ser valido').isMongoId(),
        validarCampos
    ],
    actualizarPrestamo);

router.delete('/:id', validarJWT, eliminarPrestamo);

router.get('/:idusuario/lector/:idlector/:idlibro/:idautor',[
    validarJWT,
    check('usuario', 'El id del usuario no es válido').isMongoId(),
    check('lector', 'El id del lector no es valido').isMongoId(),
    check('libro', 'El id del libro no es válido').isMongoId(),
    check('autor', 'El id del autor no es valido').isMongoId(),

    ],
    busquedaPrestamo);

module.exports = router; //para exportar