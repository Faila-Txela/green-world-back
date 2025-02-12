import express from 'express'
import cors from 'cors'

const app = express()

app.use(express.json())

app.use(cors('http://lojaOnline.com.br'))

const users = [
    {
        name: "Txela",
        age: 18
    },
    {
        name: "Júnior",
        age: 24
    }
]

app.get('/users', function (req, res) {
    res.json(users)
})

app.post('/users', function (req, res) {
    console.log(req.body)
    const newUser = req.body

    users.push(newUser)

    res.status(201).json(newUser)
})



app.listen(3001, () => console.log("Servidor rodando"))