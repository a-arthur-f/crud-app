const express =  require('express');
require('dotenv').config();

const controllerFilm = require('./controllers/controllerFilm');

const router = express.Router();

router.get('/', controllerFilm.index);
router.get('/genres', controllerFilm.genres);

router.get('/:id', controllerFilm.index);

router.post('/', controllerFilm.create);

router.put('/:id', controllerFilm.update);

router.delete('/:id', controllerFilm.delete);

module.exports = router;