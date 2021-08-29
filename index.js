const express = require('express');
const app = express();
const cors = require('cors');
const dontenv = require('dotenv');
const _PORT = process.env.PORT || 3000;
const logger = require('morgan')
const helmet = require("helmet");
const mongoose = require('mongoose');

dontenv.config();

mongoose.connect(process.env.DB_CONNECT,
    { useNewUrlParser: true, useUnifiedTopology: true, },
    (err) => {
        if (!err) console.log('MongoDB Connection')
        else console.log(err)
    })

app.use(express.json({ limit: '1mb' }))
app.use(express.urlencoded({ limit: '1mb', extended: false }));

app.options('*', cors())
// CORS
app.use(cors({
    origin: '*',
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE"
}))
app.use(logger('dev'))
app.use(helmet());


app.get('/', (req, res, next) => {
    return res.status(200).json({
        status: true,
        message: "KB Careers Task",
        description: ""
    })
})

require("./routes/product.routes")(app);
require("./routes/users.routes")(app);
require("./routes/order.routes")(app);
require("./routes/admin.routes")(app);
require("./routes/deliveryPerson.routes")(app);

// Server Configuration
app.listen(_PORT, () => {
    console.log(`App started and Listening on port ${_PORT}`)
})