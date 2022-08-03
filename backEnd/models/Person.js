const mongoose = require('mongoose');

const Person = mongoose.model('Person', {
    pedido: Number,
    item: String,
    verificado: Boolean,
})

module.exports = Person


