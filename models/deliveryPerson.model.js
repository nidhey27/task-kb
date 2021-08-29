const mongoose = require('mongoose');

const DeliveryPersonSchema = new mongoose.Schema({
    name: {
        type: String,
        default: "Delivery Person X"
    },
    phone: {
        type: String,
        required: true,
        max: 11
    }
}, { collection: "DeliveryPerson" })

module.exports = mongoose.model('DeliveryPerson', DeliveryPersonSchema);