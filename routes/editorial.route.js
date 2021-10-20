const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');
const {getEditorial, registrarEditorial, actualizarEditorial, eliminarEditorial} = require('../controllers/editorial.controller');


const router = Router();

router.get('/', getEditorial);


router.post('/', [
        validarJWT,
        check('nombre', 'El nombre de la editorial es obligatoria').not().isEmpty(),
        check('pais','El id del pais debe de ser válido').isMongoId(),
        validarCampos
    ],
    registrarEditorial);

router.put('/:id', [
        validarJWT,
        check('nombre', 'El nombre de la editorial es obligatoria').not().isEmpty(),
        check('pais','El id del pais debe de ser válido').isMongoId(),
        validarCampos
    ],
    actualizarEditorial);

router.delete('/:id',
    validarJWT,
    eliminarEditorial);



module.exports = router;