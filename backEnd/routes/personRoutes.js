const router = require("express").Router();

const Person = require('../models/person')

// create / criação de dados
router.post('/', async (req, res) => {

    // req.bordy
  
    // exemplo de req : { pedido: 123456, item: "Porquinho", verificado: true}
    const {pedido, item, verificado} = req.body
  
    if(!pedido) {
      res.status(422).json({error: 'o pedido e obrigatorio!'})
      return 
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

  // Read / leitura de dados
  router.get('/' , async (req, res) => {
    try{

      const people = await Person.find()

      // ...ai eu envio como json o people que eu sei que são todos os dados cadastrados
      res.status(200).json(people)

    }catch (error) {
      res.status(500).json({ error: error })
    }
  })


  // Read - filtrar por pessoa
  router.get('/:pedido', async (req, res) => {
    
    // to print everything of the requision on terminal
    console.log(req)

    // extrair o dado da requisição pela url = req.params
    const pedido = req.params.pedido

    try{
      const person = await Person.findOne({pedido: pedido})

      if(!person) {
        res.status(422).json({message: 'O pedido não foi encontrado :( !'})
        return
      }

      res.status(200).json(person)

    } catch (error) {
      res.status(500).json({ error: error })
    }

  })

  // update - atualização de dados (PUT, PATCH)
    // PUT: espera o objeto completo
    // PATCH: deixa atualizar somente um campo

router.patch('/:pedido' , async (req, res) => {
  
  const Pedido = req.params.pedido

  const {pedido, item, verificado} = req.body

  const person = {
    pedido,
    item,
    verificado
  }

  try{

    const updatedPerson = await Person.updateOne({pedido:pedido}, person)

    console.log(updatedPerson)

    if(updatedPerson.matchedCount === 0) {
      res.status(422).json({message: 'O pedido não foi atualizado :( !'})
      return
    }

    res.status(200).json(person)

  }catch{
    res.status(500).json({error:error})
  }
})
  
// router delete

router.delete('/:pedido', async (req, res) => {
  const pedido = req.params.pedido

  const person = await Person.findOne({pedido:pedido})
  if(!person) {
    res.status(422).json({message: 'O usuario nao foi deletado :( !'})
    return
  }
  try{

    await Person.deleteOne({pedido:pedido})
    res.status(200).json({message: 'Usuario removido com sucesso! :)'})

  }catch(error) {
    res.status(500).json({error:error})
  }

})

  module.exports = router