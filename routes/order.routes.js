module.exports = app => {
    const order = require('../controllers/order.controller')
    const validateToken = require('../middlewares/validateToken')

    const ValidateAdmin = require('../middlewares/validateAdmin')

    var router = require("express").Router();


     router.post("/", validateToken ,order.placeOrder);
     router.post("/add-to-cart", validateToken ,order.addToCart);

     router.get("/getAllOrders" , ValidateAdmin , order.getAllOrders);


     app.use('/api/order', router);
}