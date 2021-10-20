const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');
const {getAutor, crearAutor, actualizarAutor, eliminarAutor} = require('../controllers/autor.controller');


const router = Router();

router.get('/', getAutor);


router.post('/', 
    [
        validarJWT,
        check('nombre', 'El nombre del autor es obligatorio').not().isEmpty(),
        check('apellido', 'Los apellidos del autor son obligatorios').not().isEmpty(),
        validarCampos
    ],
    crearAutor);

router.put('/:id', [
        validarJWT,
        check('nombre', 'El nombre del autor es obligatorio').not().isEmpty(),
        check('apellido', 'Los apellidos del autor son obligatorios').not().isEmpty(),
        validarCampos
    ],
    actualizarAutor);

router.delete('/:id',
    eliminarAutor);



module.exports = router;