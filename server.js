import express, { response } from "express";
import cors from 'cors'
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = express()
app.use(express.json())
app.use(cors())

app.post('/usuarios', async (req, res) => {
  // Criar Usuário
  await prisma.user.create({
    data: {
      email: req.body.email,
      name: req.body.name,
      age: req.body.age
    }
  })
  res.status(201).json(req.body)
})

app.get('/usuarios', async (req, res) => {
  // Listar Usuário
  let users = []

  if(req.query) {
    users = await prisma.user.findMany({
      where: {
        name: req.query.name,
        email: req.query.email,
        age: req.query.age
      }
    })
  } else {
    users = await prisma.user.findMany()
  }
  res.status(202).json(users)
})

app.put('/usuarios/:id', async (req, res) => {
  // Editar Usuário
  await prisma.user.update({
    where: {
      id: req.params.id
    },
    data: {
      email: req.body.email,
      name: req.body.name,
      age: req.body.age
    }
  })
  res.status(200).json(req.body)
})

app.delete('/usuarios/:id', async (req, res) => {
  // Deletar Usuário
  await prisma.user.delete({
    where: {
      id: req.params.id
    }
  })

  res.status(200).json({message: "Usuário deletado com Sucesso!"})
})

app.listen(3000)
