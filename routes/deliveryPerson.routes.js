module.exports = app => {
    const deliveryPerson = require('../controllers/deliveryPerson.controller')
    const ValidateAdmin = require('../middlewares/validateAdmin')
    const ValidateDeliveryPerson = require('../middlewares/validateDeliveryPerson')

    var router = require("express").Router();
    
    router.post("/login"  , deliveryPerson.login);

    
     router.get("/getAllDeliveryPersons" , ValidateAdmin , deliveryPerson.getAllDeliveryPerson);

     router.get("/"  ,ValidateDeliveryPerson, deliveryPerson.getAllDeliveries);
     
     router.put("/:oid"  ,ValidateDeliveryPerson ,deliveryPerson.updateOrderStatus);




     app.use('/api/delivery', router);
}