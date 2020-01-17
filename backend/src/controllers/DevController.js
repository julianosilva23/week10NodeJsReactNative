const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

// funções node padrões controller: index, show, store, update, destroy

module.exports = {

    async index(request, response) {
        const devs = await Dev.find();

        return response.json(devs);
    },

    async store(request, response) {
        const { github_username, techs, latitude, longitude } = request.body;

        // verifica duplicado
        let dev = await Dev.findOne({ github_username });

        if(!dev) {

            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`)
    
            // caso o name não existir ele pega o login
            const { name = login, avatar_url, bio } = apiResponse.data;
    
            const techsArray = parseStringAsArray(techs);
    
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude]
            }
    
            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location
            });
        }


        return response.json(dev);
    },
    async update() {
        // não atualizar github username
    },
    async destroy() {

    },
}