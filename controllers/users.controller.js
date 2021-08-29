const User = require('../models/users.model')
const jwt = require('jsonwebtoken');

exports.signUp = async (req, res, next) => {
    try {

        if (req.body.phone == '')
            return res.status(200).json({ status: false, message: "Phone is required", data: "" })

        let alreadyExists = await User.findOne({ phone: req.body.phone })

        if (alreadyExists) return res.status(409).json({ status: false, message: `${req.body.phone} - This Mobile is associated with another account, Please try again with a new one.` })

        const data = new User({
            phone: req.body.phone
        })

        try {
            let pushedData = await data.save();
            return res.status(200).json({ status: true, message: "Added Successful", data: pushedData })
        } catch (err) {
            console.log(err)
            return res.status(200).json({ status: false, error: err.message })
        }

    } catch (err) {
        console.log(err)
        return res.status(400).json({ status: false, message: err.message })

    }
}


exports.login = async (req, res, next) => {
    try {
        if (req.body.phone == '')
            return res.status(200).json({ status: false, message: "Phone is required", data: "" })

        let alreadyExists = await User.findOne({ phone: req.body.phone })

        if (!alreadyExists) return res.status(409).json({ status: false, message: `No User Found` })


        let payload = { user_id: alreadyExists._id }
        let accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
            algorithm: "HS256"
        })

        return res.status(200).header("auth-token", accessToken).json({
            status: true,
            data: { 
            },
            message: "success"
        })
    } catch (err) {
        console.log(err)
        return res.status(400).json({ status: false, message: err.message })

    }
}