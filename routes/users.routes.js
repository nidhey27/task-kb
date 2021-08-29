module.exports = app => {
    const users = require('../controllers/users.controller')

    var router = require("express").Router();


     router.post("/signup", users.signUp);
     router.post("/login", users.login);


     app.use('/api/user', router);
}