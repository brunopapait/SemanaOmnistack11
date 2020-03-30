const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const OngController = require('../src/controllers/OngController');
const IncidentController = require('../src/controllers/IncidentController');
const ProfileController = require('../src/controllers/ProfileController');
const SessionController = require('../src/controllers/SessionController');



const routes = express.Router();

routes.post('/session', celebrate({
  [Segments.BODY]: Joi.object().keys({
    id: Joi.string().required(),
  })
}), SessionController.create)

routes.get('/ongs', OngController.index);

routes.post('/ongs', celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    whatsapp: Joi.string().required().min(10).max(11),
    city: Joi.string().required(),
    uf: Joi.string().required().length(2),
  }),
}), OngController.create);

routes.get('/profile',celebrate({
[Segments.HEADERS]: Joi.object({
  authorization: Joi.string().required(),
}).unknown(),
}), ProfileController.index);

routes.post('/incidents', celebrate({
  [Segments.HEADERS]: Joi.object({
  authorization: Joi.string().required(),
}).unknown(),
}), celebrate({
  [Segments.BODY]: Joi.object().keys({
    title: Joi.required(),
    description: Joi.string().required().min(1).max(200),
    value: Joi.number().required().positive().precision(2),
  })
}),IncidentController.create);

routes.get('/incidents', celebrate({
  [Segments.QUERY]: Joi.object().keys({
    page: Joi.number(),
  })
}), IncidentController.index);

routes.delete('/incidents/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required(),
  })
}), IncidentController.delete);

module.exports = routes;