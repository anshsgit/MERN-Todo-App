const route = require("/Users/anshgupta/Desktop/javascript/FullStack-TodoApp/backend/routes/index.js")

const express = require('express');
const app = express();

app.use(express.json());

app.use('/', route);

const port = 3000;
app.listen(port, () => {
    console.log(`App is listening on port: ${port}`);
});