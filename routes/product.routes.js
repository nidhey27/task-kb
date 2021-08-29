module.exports = app => {
    const product = require('../controllers/product.controller')
    const validateToken = require('../middlewares/validateToken')

    var router = require("express").Router();


     router.get("/", validateToken ,product.getAllProducts);


     app.use('/api/products', router);
}