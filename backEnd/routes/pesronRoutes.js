const { Router } = require("express").Router();

const Person = require('../models/person')

router.post('/', async (req, res) => {

    // req.bordy
  
    // exemplo de req : { pedido: 123456, item: "Porquinho", verificado: true}
    const {pedido, item, verificado} = req.body
  
    if(!pedido) {
      res.status(422).json({error: 'o pedido e obrigatorio!'})
    }
  
    const person = {
      pedido,
      item,
      verificado
    }
  
    try {
      // criando dados
      await Person.create(person)
  
      res.status(201).json({ message: 'Uhuuul pedido criado com sucesso!'})
  
    }catch(error) {
      res.status(500).json({error: error})
    }
  
  })
  
  module.exports = router