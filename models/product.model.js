const mongoose = require('mongoose');

const productsSchema = new mongoose.Schema({
    
    name: {
        type: String
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
    }
}, { collection: "Products" })

module.exports = mongoose.model('Products', productsSchema);