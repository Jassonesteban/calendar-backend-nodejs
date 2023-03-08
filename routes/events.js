const { Router } = require('express');
const { check } = require('express-validator');
const { getEventos, createEventos, updateEventos, deleteEventos } = require('../controllers/events');
const { isDate } = require('../helpers/isDate');
const router = Router();
const { validarCampos } = require('../middlewares/validarCampos');
const { validarJWT } = require('../middlewares/validarJWT');

/**********************************************************************************************************************************************/

router.use(validarJWT);

/***********obtener eventos***************/
router.get('/', getEventos);

/************crear un evento nuevo *********************/
router.post('/', [
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('notes', 'Debe ingresar al ,menos una descripcion para el evento').not().isEmpty(),
    check('start', 'Fecha de inicio es obligatoria').custom(isDate),
    check('end', 'Fecha de finalizacion es obligatoria').custom(isDate),
    validarCampos
], createEventos);

/*******************actualizar evento*************************/
router.put('/:id', updateEventos);

/************************Borrar evento*********************** */
router.delete('/:id', deleteEventos);


module.exports = router;