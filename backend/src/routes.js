const { Router } = require('express');
const axios = require('axios');

const routes = Router();

routes.get('/', (request, response) => {
    return response.json({ message: 'Hello World1' });
})

routes.post('/devs', async (request, response) => {
    const { github_username } = request.body;

    const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`)
 
    // caso o name não existir ele pega o login
    const { name = login, avatar_url, bio } = apiResponse.data;

    console.log(name, avatar_url, bio, github_username)

    return response.json({ userId: request.body });
})

module.exports = routes;