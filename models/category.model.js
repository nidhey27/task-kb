const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    addresses: [
        {
            loc: {
                type: String
            },
            long: {
                type: String
            },
            lat: {
                type: String
            }
        }
    ],
    name: {
        type: String
    }
}, { collection: "Category" })

module.exports = mongoose.model('Category', categorySchema);