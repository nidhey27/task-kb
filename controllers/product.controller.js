const Category = require('../models/category.model')
const Products = require('../models/product.model')

exports.getAllProducts = async (req, res, next) => {
    try {

        await Category.aggregate([
            {
                $lookup: {
                    from: 'Products',
                    localField: '_id',
                    foreignField: 'categoryId',
                    as: 'products'
                }
            }
        ]).then(resp => {
            // res.send(resp);
            res.status(200).json({ status: true, message: "success", data: resp })
        }).catch(error => {
            res.send(error)
        })

        // let data = await Category.find()
        // return res.send(data)

    } catch (err) {
        console.log(err)
        return res.status(400).json({ status: false, message: err.message })

    }
}