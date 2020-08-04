require("dotenv-safe").config();
const express = require('express');
const helmet = require('helmet')
const cors = require('cors');
const { errors } = require('celebrate'); 
const routes = require('./src/routes');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(routes);

app.use(errors());

let port = 3333;
app.listen(port, () => {
    console.log('Server started at port ' + port);
});