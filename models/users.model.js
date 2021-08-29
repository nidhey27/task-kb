const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    name: {
        type: String,
        default: null
    },
    phone: {
        type: String,
        required: true,
        max: 11
    }
}, { collection: "Users" })

module.exports = mongoose.model('Users', usersSchema);