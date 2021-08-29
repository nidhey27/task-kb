const Order = require('../models/order.model')
const ObjectID = require('mongodb').ObjectID
const Category = require('../models/category.model')
const Product = require('../models/product.model')
const DeliveryPerson = require('../models/deliveryPerson.model')

const jwt = require('jsonwebtoken');

exports.login = async (req, res, next) => {
    try {
        if (req.body.phone == '')
            return res.status(200).json({ status: false, message: "Phone is required", data: "" })

        let alreadyExists = await DeliveryPerson.findOne({ phone: req.body.phone })

        if (!alreadyExists) return res.status(409).json({ status: false, message: `No DeliveryPerson Found` })


        let payload = { DeliveryPerson_id: alreadyExists._id, role: 'DeliveryPerson' }
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



exports.getAllDeliveryPerson = async (req, res, next) => {
    try {

        

        let data = await DeliveryPerson.find()

        return res.status(200).json({
            status: true,
            message: "success",
            data
        })
    } catch (err) {
        console.log(err)
        return res.status(400).json({ status: false, message: err.message })

    }
}

exports.getAllDeliveries = async (req, res, next) => {
    try {
        const { DeliveryPerson_id } = req.decoded
        let data = await Order.find({ deliveryPersonId: ObjectID(DeliveryPerson_id) })

        return res.status(200).json({
            status: true,
            message: "success",
            data
        })
    } catch (err) {
        console.log(err)
        return res.status(400).json({ status: false, message: err.message })

    }
}

exports.updateOrderStatus = async (req, res, next) => {
    try {
        const { DeliveryPerson_id } = req.decoded
        let checkOrder = await Order.findOne({ _id: ObjectID(req.params.oid), deliveryPersonId: ObjectID(DeliveryPerson_id) })
        if (!checkOrder)
            return res.status(200).json({ status: false, message: "No Order Found", data: "" })

        

        let data = await Order.findByIdAndUpdate({ _id: ObjectID(req.params.oid) }, {
            $set: {
                orderStage: req.body.orderStage
            }
        }, { upsert: true }).then(resp => {
            return res.status(200).json({ status: true, message: "Status Updated!" })
        }).catch(error => {
            return res.status(200).json({ status: false, error: error.message })
        })
    } catch (err) {
        console.log(err)
        return res.status(400).json({ status: false, message: err.message })

    }
}
