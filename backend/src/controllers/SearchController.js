const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
    async index(request, response) {
        // buscar todos os devs num raio de 10 kg
        // filtrar por tecnologias
        const { latitude, longitude, techs } = request.query;
        
        techsArray = parseStringAsArray(techs)
        
        console.log(techsArray);

        const devs = await Dev.find({
            techs: {
                $in: techsArray,
            },
            location: {
                $near: {// encontrar objetos perto de uma localização
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude],
                    },
                    $maxDistance: 10000
                },
            },
        });



        return response.json({ devs: devs })
    }
}