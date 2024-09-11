const mongoose = require('mongoose')
// const category = require('./category')


const productSchema = new mongoose.Schema({
    category: {type: mongoose.Types.ObjectId, ref: "Category", required: true},
    name: {type: String, required: true},
    price: {type: Number, required: true},
    images: [{ img: {type: String, required: true}}],
    description : {type: String, required: true},
    featured : {type: Boolean, required: false},
    topSelling : {type: Boolean, required: false},
})

module.exports = mongoose.model("Product", productSchema);  