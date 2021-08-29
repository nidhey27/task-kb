const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    items: [
        // {
        //     productId: {
        //         type: mongoose.Schema.Types.ObjectId,
        //         required: true,
        //     },
        //     quantity: {
        //         type: Number,
        //         default: 0
        //     },
        //     subTotal: {
        //         type: String,
        //         required: true,
        //         default: '0'
        //     }
        // }
    ],
    deliveryPersonId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DeliveryPerson',
        default: null
    },
    orderStage: {
        type: String,
        default: 'Task Created',
        enum: ['Task Created', 'Reached Store', 'Items Picked', 'Enroute', 'Delivered', 'Canceled']
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    grandTotal: {
        type: String,
        default: '0'
    }
}, { collection: "Orders" })

module.exports = mongoose.model('Orders', orderSchema);