const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();

app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.use(morgan("dev"))


const PORT = 5000;

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
})
