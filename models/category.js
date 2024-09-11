
const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({
    name: { type: String, required: true, minlength: 5, maxlength: 250,},
    description: { type: String, required: true}
})

module.exports = mongoose.model("Category", categorySchema)