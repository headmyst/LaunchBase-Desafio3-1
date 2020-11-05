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

//Definindo Porta
server.listen(5000, function(){
    console.log("Server is running")
})