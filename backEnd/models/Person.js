const mongoose = require('mongoose');

const Person = mongoose.model('Person', {
    pedido: Number,
    item: String,
    ean: Number,
    serial: Number,
    verificado: Boolean,
})

module.exports = Person


