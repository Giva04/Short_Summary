//importando biblioteca para fazer Download do Vídeo
import ytdl from "ytdl-core"
//biblioteca disponivel no VS para manipular arquivos
import fs from "fs"

//cosnst com função que fará o download do vídeo usando parametro(videoID)
export const download = (videoId) => new Promise((resolve, reject) => {
  //endereço do video 
  const videoURL = "https://www.youtube.com/shorts/" + videoId
  console.log("Realizando o download do vídeo:" , videoId)

  ytdl(videoURL, { quality: "lowestaudio", filter: "audioonly" })
    .on("info", (info) => {
      //criando variavel que confirma se é um short
      const seconds = info.formats[0].approxDurationMs / 1000

      if (seconds > 60) {
        throw new Error("A duração desse vídeo é maior que 60 segundos.")
      }
    })
    //finaliando download do vídeo
    .on("end", () => {
      console.log("Download do vídeo finalizado")
      resolve()
    })
    //error
    .on("error", (error) => {
      console.log(
        "Não foi possível fazer o download do vídeo. Detalhes do error: ",
        error
      )
      reject(error)
    }) 
    //pipe recupera o conteudo e salva tmp , pasta temporaria
    .pipe(fs.createWriteStream("./tmp/audio.mp4"))
})