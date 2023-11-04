//importando axios que fara a conexao do front com o BackEnd
import axios from "axios"

//criando configuração do axios
export const server = axios.create({
  //baseUrl faz o endereço repitir para todas as requisições
  baseURL: "http://localhost:3333",
})