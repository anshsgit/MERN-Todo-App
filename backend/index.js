const path = require('path');
const file = path.join(__dirname, 'routes', 'index.js');
console.log(file);
const route = require(file);
const cors = require('cors');

const express = require('express');
const app = express();

app.use(express.json());
app.use(cors());

app.use('/', route);

const port = 3000;
app.listen(port, () => {
    console.log(`App is listening on port: ${port}`);
});