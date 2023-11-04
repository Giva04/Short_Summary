
import {server} from './server.js'
// Funcção que seleciona o formulario
// para selecionar um objeto inteiro EX: form. Usamos #nome do objeto
const form = document.querySelector('#form')

//recuperando a informação digitada no input
const input = form.querySelector("#url")

//Retornando mensargem de erro para o usuario
const content = document.querySelector("#content")


form.addEventListener("submit", async(event) => {
  //Tirando opção padrão que recarrega pagina automaticamente
  event.preventDefault()
  
  //sempre que houver novo envio a class é adicionada
  content.classList.add("placeholder")

  //Pegando URL do Video
  const videoURL = input.value

  //condição que valida o video atraves de uma palavra especifica(SHORTS) 
  if(!videoURL.includes("shorts")){
    return content.textContent = "Esse video não é um Short; Escolha outro vídeo!! "
  }

  //divindo o texto mostrando somente o necesario , usamos [array]para buscar objeto determinado
  const [_, params] = videoURL.split("/shorts/")
  //params q condiciona e as informções da URL, pegando somente o ID do video
  const [videoID] = params.split("?si")
    
  //Extraindo as informações do texto o video
  content.textContent = "Carregando o texto do áudio..."

  //requisição do texto do audio
  const transcription = await server.get("/summary/" + videoID)

  //mudando frase de interação com usuario quando estiver baixando
  content.textContent = "Realizando Resumo!!!"

  //Criando nova rota de requisição
  const summary = await server.post("/summary", {
    text: transcription.data.result, 
  })
// alterendo informação do resumo para usuario
  content.textContent = summary.data.result

  //removendo a class placeholder
  content.classList.remove("placeholder")

})