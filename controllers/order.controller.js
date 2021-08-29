const Order = require('../models/order.model')
const Cart = require('../models/cart.model')
const ObjectID = require('mongodb').ObjectID
const Category = require('../models/category.model')
exports.placeOrder = async (req, res, next) => {
    try {
        const { user_id } = req.decoded
        const customerId = user_id

        let cartItems = await Cart.find({ customerId: ObjectID(customerId) })

        // res.send(cartItems)

        let data = new Order({
            items: cartItems,
            customerId
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

exports.addToCart = async (req, res, next) => {

    // return res.send("hola")
    try {
        const { user_id } = req.decoded
        const customerId = user_id
        const {
            categoryId,
            productId,
            quantity
        } = req.body

        if (productId == '' || categoryId == '')
            return res.status(200).json({ status: false, message: "productId and categoryId is required", data: "" })

        if (quantity < 1)
            return res.status(200).json({ status: false, message: "Quantity must be greater than 0", data: "" })

        let categoryData = await Category.findOne({ _id: ObjectID(categoryId) })
        // console.log(categoryData.addresses.length);
        // console.log(Math.floor(Math.random() * (categoryData.addresses.length - 0) + 0)) ;
        // res.send(categoryData.addresses)

        let pickupLocations = categoryData.addresses[Math.floor(Math.random() * (categoryData.addresses.length - 0) + 0)]

        // console.log(pickUpAddress);
        // return 0;
        let existingItem = await Cart.findOne({ productId, customerId })

        if (existingItem) {
            let data = await Cart.findByIdAndUpdate({ _id: ObjectID(existingItem._id) }, {
                $set: {
                    quantity
                }
            }, { upsert: true }).then(resp => {
                return res.status(200).json({ status: true, message: "Updated!" })
            }).catch(error => {
                return res.status(200).json({ status: false, error: error.message })
            })

            return 0;
        }

        // Add New Item to Cart
        let data = new Cart({

            productId,
            quantity,
            customerId,
            categoryId,
            pickupLocations
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

exports.getAllOrders = async (req, res, next) => {
    try {

        // await Order.aggregate([
        //     { $match: {
        //         orderStage: { $regex: new RegExp(`${req.query.filter}`, "gi") }
        //     } },
        //     {
        //         $lookup: {
        //             from: 'Products',
        //             localField: 'items.productId',
        //             foreignField: '_id',
        //             as: 'product_details'
        //         },

        //     }
        // ]).then(resp => {
        //     // res.send(resp);
        //     res.status(200).json({ status: true, message: "success", data: resp })
        // }).catch(error => {
        //     res.send(error)
        // })

        // return 0;
        if (req.query.filter) {

            await Order.aggregate([
                {
                    $match: {
                        orderStage: { $regex: new RegExp(`${req.query.filter}`, "gi") }
                    }
                },
                // {
                //     "$unwind": "$items"
                // },
                {
                    $lookup: {
                        from: 'Products',
                        as: 'product_details',
                        localField: 'items.productId',
                        foreignField: '_id',
    
                    },
    
    
                },
                // {
                //     "$unwind": "$items.product_details"
                // },
                // {
                //     "$group": {
                //         "_id": "$_id",
                //         "items": {
                //             "$push": "$items"
                //         }
                //     }
                // }
            ]).then(resp => {
                // res.send(resp);


                return res.status(200).json({ status: true, message: "success", data: resp })
            }).catch(error => {
                return res.send(error)
            })

            return 0;
        }

        await Order.aggregate([
                // {
                //     "$unwind": "$items"
                // },
            {
                $lookup: {
                    from: 'Products',
                    as: 'product_details',
                    localField: 'items.productId',
                    foreignField: '_id',

                },


            },
            // {
            //     "$unwind": "$items.product_details"
            // },
            // { $wind: "$items" },
            // {
            //     "$group": {
            //         "_id": "$_id",
            //         "items": {
            //             "$push": "$items"
            //         },
                    
            //     }
            // }




            // { $unwind: "$items" },
            // { $unwind: "$product_details" },
            // {
            //     $project: {
            //         "items": 1,
            //         "product_details": 1,
            //         "isMatch": {
            //             "$cond": [{ "$eq": ["$items.productId", "$product_details._id"] }, 1, 0]
            //         }
            //     }
            // }
        ]).then(async resp => {
            // res.send(resp);

            
            return res.status(200).json({ status: true, message: "success", data: resp })
        }).catch(error => {
            return res.send(error)
        })

    } catch (err) {
        console.log(err)
        return res.status(400).json({ status: false, message: err.message })

    }
}

// async function mergeData(a){


//     // console.log(a)
//     let itemsArray = []
//     let pDataArray = []
//     // console.log(a.length)
    

//     a.forEach((elem, index) => {
//         // console.log(index);

//         // itemsArray.push(elem.items)
//         // pDataArray.push(elem.product_details)

//         itemsArray = [ ...elem.items, ...elem.product_details ]
//     })
//     // console.log(itemsArray)
//     // return "1"

//     var result = [];

//     var c = itemsArray;
//     // return c
//     console.log(c)
//        for (var i = 0; i < c.length; i++){
//             if (c[i].productId == '612b26d4978dd91bd2afad97')
//             {

//                 result.push(c[i], c[i].name);
//             }
//         }

//     return result;

// }