const Order = require('../models/order.model')
const ObjectID = require('mongodb').ObjectID
const Category = require('../models/category.model')
const Product = require('../models/product.model')
const Admin = require('../models/admin.model')
const DeliveryPerson = require('../models/deliveryPerson.model')

const jwt = require('jsonwebtoken');

exports.loginAdmin = async (req, res, next) => {
    try {
        if (req.body.phone == '')
            return res.status(200).json({ status: false, message: "Phone is required", data: "" })

        let alreadyExists = await Admin.findOne({ phone: req.body.phone })

        if (!alreadyExists) return res.status(409).json({ status: false, message: `No Admin Found` })


        let payload = { Admin_id: alreadyExists._id, role: 'Admin' }
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


exports.assignOrderToDeliveryPerson = async (req, res, next) => {
    try {
        if (req.params.dId == '')
            return res.status(200).json({ status: false, message: "Delivery Person ID is required", data: "" })

        if (req.params.oId == '')
            return res.status(200).json({ status: false, message: "Order ID is required", data: "" })

        let checkDeliveryPerson = await DeliveryPerson.findOne({ _id: ObjectID(req.params.dId) })

        if (!checkDeliveryPerson)
            return res.status(200).json({ status: false, message: "No Delivery Person Found", data: "" })

        let checkOrder = await Order.findOne({ _id: ObjectID(req.params.oId) })
        if (!checkOrder)
            return res.status(200).json({ status: false, message: "No Order Found", data: "" })

        let data = await Order.findByIdAndUpdate({ _id: ObjectID(req.params.oId) }, {
            $set: {
                deliveryPersonId: req.params.dId
            }
        }, { upsert: true }).then(resp => {
            return res.status(200).json({ status: true, message: "Assigned!" })
        }).catch(error => {
            return res.status(200).json({ status: false, error: error.message })
        })
        // console.log(data)


    } catch (err) {
        console.log(err)
        return res.status(400).json({ status: false, message: err.message })

    }
}
