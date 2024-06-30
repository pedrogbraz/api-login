import express, { response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = express()
app.use(express.json())

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


app.listen(3000)
