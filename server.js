const express = require('express')
const nunjucks = require('nunjucks')

const server = express()

//O ./ referencia a um arquivo da raiz do projeto
const videos = require("./data")

server.use(express.static('public'))

server.set("view engine", "njk")

nunjucks.configure("views", {
    express: server,
    autoescape: false,
    noCache: true   
})

//Criando Rotas
server.get("/", function(req, res){
    return res.render("about")
})

server.get("/courses", function(req, res){
    return res.render("courses", {items: videos})
})

server.get("/video", function(req, res){
//Crio uma variavel de nome id para definir ela com o código da url do vídeo
    const id = req.query.id

//Declaro uma váriavel com uma função que vai percorrer o array dos vídeos para encontar os id's.
//========= TENTAR IMPLEMENTAR UM FOR AO INVÉS DE IF =========
    const video = videos.find(function(video){
        if (video.id == id)
            return true    
    })
    if (!video.id) {
        return("Video not found!")
    }

    return res.render("video", {video})
})

//Essa rota é direcionada a uma página não existente, famoso erro 404
server.use(function(req, res){
    res.status(404).render("not-found")
})

//Definindo Porta
server.listen(4000, function(){
    console.log("Server is running")
})