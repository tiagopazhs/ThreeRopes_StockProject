// config inicial
const express = require('express')
const mongoose = require('mongoose')
const app = express()

const Person = require('./models/Person')

// forma de ler JSON / middlewares
app.use(express.urlencoded({
  extended: true,
}),
)

app.use(express.json())

// rotas da animationPlayState: 
app.post('/person', async (req, res) => {

  // req.bordy

  // exemplo de req : { pedido: 123456, item: "Porquinho", verificado: true}
  const {pedido, item, verificado} = req.body

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

// rota inicial / endpoint

app.get('/', (req, res) => {

  //mostrar req

  res.json({message: 'Avançar!'})

})


// Senha: Aani0607
// String para conectar no banco:
// mongodb+srv://tiagopazhs:<password>@trapicluster.ehohbut.mongodb.net/?retryWrites=true&w=majority

// String de conexao ja colocando a senha
// mongodb+srv://tiagopazhs:<Aani0607>@trapicluster.ehohbut.mongodb.net/?retryWrites=true&w=majority


// entregar uma porta
const DB_USER = 'tiagopazhs'
const DB_PASSWORD = encodeURIComponent('Aani0607')

mongoose.connect(
  `mongodb+srv://${DB_USER}:${DB_PASSWORD}@trapicluster.ehohbut.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log('Yeahhh we ara connected in MongoDb!!!')
    app.listen(3000)
  })

  .catch((err) => console.log(err))

