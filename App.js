//configura el express
const express = require('express');
const bodyParser = require('body-parser')
const app = express()

 // parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// parse application/json
app.use(bodyParser.json())

require('dotenv').config()

const port = process.env.PORT || 3000;
//conexion  a base de datos
const mongoose = require('mongoose');
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.im8guww.mongodb.net/retryWrites=true&w=majority`;
mongoose.connect(uri,)
    .then(()=>console.log('Base de datos conectada'))
    .catch(e => console.log(e))
 
//configuramos los motores de plantilla
app.set('view engine','ejs');
//configuramos la carpeta  vistas 
app.set('views', __dirname +"/views");
 
// configurar de la carpeta estatica (public)
app.use(express.static(__dirname +"/public"));

//rutas     
app.use('/',require('./router/rutas'));
app.use('/Productos',require('./router/Productos'));

app.use((req,res,next)=>{
    res.status(404).render("404",{
        titulo: "404",
        descripcion: "Snack ULV"
    })
})

// para configurra el puerto
app.listen(port, () => {
  console.log('Pagina conectada en el puerto:',port)
});