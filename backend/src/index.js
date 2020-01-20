const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const routes = require('./routes')
const { setupWebsocket } = require('../src/websocket')

const app = express();
const server = http.Server(app); // extair o servidor http

setupWebsocket(server)

mongoose.connect('mongodb+srv://juliano:juliano@cluster0-j2up0.mongodb.net/week10?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })


app.use(cors());
app.use(express.json()); // cadastrar requisições no formato json
app.use(routes);

server.listen(3333);

// websocket
// enviar uma informação para o front-end sem uma requisição
// protocolo websocket