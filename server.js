const express = require('express')
const nunjucks = require('nunjucks')

const server = express()

server.use(express.static('public'))

server.set("view engine", "njk")

nunjucks.configure("views", {
    express: server
})

//Criando Rotas
server.get("/", function(req, res){
    return res.render("about")
})

server.get("/courses", function(req, res){
    return res.render("courses")
})

//Essa rota é direcionada a uma página não existente, famoso erro 404
server.use(function(req, res){
    res.status(404).render("not-found")
})

//Definindo Porta
server.listen(5000, function(){
    console.log("Server is running")
})