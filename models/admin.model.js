const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        default: "Delivery Person X"
    },
    phone: {
        type: String,
        required: true,
        max: 11
    }
}, { collection: "Admin" })

module.exports = mongoose.model('Admin', adminSchema);