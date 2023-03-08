const {Router} = require('express');
const {check} = require('express-validator');
const router = Router();
const {crearUsuario, revalidarToken, loginUsuario} = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validarCampos');
const { validarJWT } = require('../middlewares/validarJWT');

/**********************************************************************************************************************************************/

router.get('/renew', validarJWT, revalidarToken);

router.post('/', [
    check('email', 'el email es obligatorio').isEmail(),
    check('password', 'la contraseña es obligatoria y debe tener 6 caracteres').isLength({min: 6}),
    validarCampos
], loginUsuario);

router.post('/new', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria, y de 6 caracteres').isLength({min: 6}),
    validarCampos
], crearUsuario);

module.exports = router;