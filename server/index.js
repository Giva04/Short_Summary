// importando bibliotecas
import cors from "cors"
import express from "express"

import { convert } from "./convert.js"
import { download } from "./download.js"
import { transcribe } from "./transcribe.js"
import { summarize } from "./summarize.js"

//funcção para iniciar o express
const app = express()
app.use(express.json())
//app.use() faz a conexão com o servidor
app.use(cors())

//criando rota do servidor
app.get("/summary/:id", async (request, response) => {
  try {
    await download(request.params.id)
    const audioConverted = await convert()
    // console.log(audioConverted)

    //chamando função que faz a transcrição
    const result = await transcribe(audioConverted)

    //pegando ID do video
    return response.json({ result })
  } catch (error) {
    console.log(error)
    return response.json({ error })
  }
})
//rota que retorno o resumo do video
app.post("/summary", async (request, response) => {
  try {
    const result = await summarize(request.body.text)
    return response.json({ result })
  } catch (error) {
    console.log(error)
    return response.json({ error })
  }
})

//inciando o servidor, execuntado função que retornar msg no terminal
app.listen(3333, () => console.log("Server is running on port 3333"))
