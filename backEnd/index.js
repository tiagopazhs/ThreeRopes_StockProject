// config inicial
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()

// forma de ler JSON / middlewares
app.use(express.urlencoded({
  extended: true,
}),
)

app.use(express.json())

// rotas da animationPlayState: 
const personRoutes = require('./routes/personRoutes')

app.use('/person', personRoutes)

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
const DB_USER = process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)

mongoose.connect(
  `mongodb+srv://${DB_USER}:${DB_PASSWORD}@trapicluster.ehohbut.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log('Yeahhh we ara connected in MongoDb!!!')
    app.listen(3000)
  })

  .catch((err) => console.log(err))

