const express = require('express');
const { celebrate, Segments, Joi } = require ('celebrate');
const router = express.Router();

const login_controller = require('./controllers/accounts.controller');
const map_controller = require('./controllers/map.controller');

router.post('/login', celebrate({
	[Segments.BODY]: Joi.object().keys({ //Validação
        username    : Joi.string().required(),
        password    : Joi.string().required(),
    })
}), login_controller.getAuthentication);


router.get('/getMapInfo', login_controller.testAuthentication, map_controller.get30InterpolatedFromTheLast50);
router.post('/createaccount', login_controller.createAccount);


module.exports = router;