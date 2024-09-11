const mongoose = require("mongoose")


const orderSchema = new mongoose.Schema({
    user : { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    firstName: { type: String},
    lastName: { type: String},
    phone: { type: String},
    address: { type: String},
    email: { type: String},
    products: [
        {
            product : { type: mongoose.Schema.Types.ObjectId, ref: "Product"},
            quantity: { type: Number}
        }
    ],
    amount: { type: Number},
    transactionId : { type: String},
    status: { type: String, default: "pending"},
    data: { type: Date, default: Date.now()}
})

module.exports = mongoose.model("Order", orderSchema)