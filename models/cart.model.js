const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    pickupLocations: [],
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    quantity: {
        type: Number,
        default: 0
    },
    subTotal: {
        type: String,
        required: true,
        default: '0'
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    }
}, { collection: "Cart" })

module.exports = mongoose.model('Cart', cartSchema);