const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');
const {getPais, agregarPais, actualizarPais, eliminarPais} = require('../controllers/pais.controller');


const router = Router();

router.get('/', getPais);


router.post('/', [
        validarJWT,
        check('nombre', 'El nombre del paìs es obligatorio').not().isEmpty(),
        validarCampos
    ],
    agregarPais);

router.put('/:id', [
        validarJWT,
        check('nombre', 'El nombre del paìs es obligatorio').not().isEmpty(),
        validarCampos
    ],
    actualizarPais);

router.delete('/:id',
    eliminarPais);



module.exports = router;