const express = require('express');
const moongose = require('mongoose');
const routes = require('./routes')

const app = express();

moongose.connect('mongodb+srv://juliano:juliano@cluster0-j2up0.mongodb.net/week10?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })

app.use(express.json()); // cadastrar requisições no formato json
app.use(routes);

app.listen(3333);