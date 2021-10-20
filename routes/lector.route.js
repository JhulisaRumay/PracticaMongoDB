const {Router} = require('express');
const {check} = require ('express-validator');
const {validarCampos} = require('../middlewares/validar-campos');
const {validarJWT} = require('../middlewares/validar-jwt');
const {getLector, crearLector, actualizarLector, eliminarLector} = require('../controllers/lector.controller');

const router = Router();

router.get ('/', validarJWT, getLector);

router.post('/',[
    validarJWT,
    check('nombre', 'El nombre del lector es obligatorio').not().isEmpty(),
    check('apellido', 'El apellido del lector es obligatorio').not().isEmpty(),
    check('celular', 'El celular del lector es obligatorio').not().isEmpty(),
    check('celular', 'El celular del lector es incorrecto').isMobilePhone(),
    check('correo', 'El correo del lector es inválido').isEmail(),
    validarCampos
],
crearLector);

router.put('/:id',[
    validarJWT,
    check('nombre', 'El nombre del lector es obligatorio').not().isEmpty(),
    check('apellido', 'El apellido del lector es obligatorio').not().isEmpty(),
    check('celular', 'El celular del lector es obligatorio').not().isEmpty(),
    check('celular', 'El celular del lector es incorrecto').isMobilePhone(),
    check('correo', 'El correo del lector es inválido').isEmail(),
    validarCampos
],
actualizarLector);

router.delete('/:id',
    validarJWT,
    eliminarLector);

module.exports = router;