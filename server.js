const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const dotEnv = require('dotenv');
dotEnv.config();


const app = express();
const userRoutes = require('./routes/users');

require('./config/db');

app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.use(morgan("dev"))

app.use("/users", userRoutes);

const PORT = process.env.PORT || 7000;


app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
})
