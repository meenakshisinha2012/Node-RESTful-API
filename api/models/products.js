const mongoose = require('mongoose');

//Schema is the layout of Object
const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    price: Number
})

module.exports = mongoose.model('Product' ,productSchema);