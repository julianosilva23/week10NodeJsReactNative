const { Router } = require('express');
const DevController = require('./controllers/DevController');
const SeachController = require('./controllers/SearchController');

const routes = Router();

routes.get('/', (request, response) => {
    return response.json({ message: 'Hello World1' });
})

routes.get('/devs', DevController.index)
routes.get('/search', SeachController.index)
routes.post('/devs', DevController.store)

module.exports = routes;