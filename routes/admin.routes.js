module.exports = app => {
    const admin = require('../controllers/admin.controller')
    
    const ValidateAdmin = require('../middlewares/validateAdmin')
    var router = require("express").Router();


     router.post("/login" ,admin.loginAdmin);
     router.post("/assign-order/:dId/:oId", ValidateAdmin ,admin.assignOrderToDeliveryPerson);
     


     app.use('/api/admin', router);
}