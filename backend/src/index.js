const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes')

const app = express();

mongoose.connect('mongodb+srv://juliano:juliano@cluster0-j2up0.mongodb.net/week10?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })


app.use(cors());
app.use(express.json()); // cadastrar requisições no formato json
app.use(routes);

app.listen(3333);