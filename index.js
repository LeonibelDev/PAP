const express = require("express")
const path = require("path")
const ejs = require("ejs")
const server = express()
const flash = require("connect-flash")
const session = require("express-session")
const cookieParser = require('cookie-parser')
const cors = require("cors") 
//multer config
const multer  = require('multer')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "/public/products"));
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  },
});

let uploads = multer({storage: storage})

let cpUploads = uploads.fields([{name: "image1"}, {name: "image2"}, {name: "image3"}, {name: "image4"}])

server.use(cpUploads)

//session config
server.use(session({
    secret: 'mysecretkey_leo',
    resave: false, // investigar mas -> https://www.npmjs.com/package/express-session 
  	saveUninitialized: false
}))

server.use(cookieParser())

//api
server.use(cors())

//middleware
const morgan = require("morgan")
server.use(morgan("dev"))
server.use(express.urlencoded({extended:false}))
server.use(express.json({
  
}))
server.use(flash())

//config view engine
server.set("view engine", "ejs")

//set views
server.set("views", path.join(__dirname, "views"))

//get static files
server.use('/public', express.static(path.join(__dirname, "./public")));
server.use(express.static("./static"))


//use routes
const router = require("./server/routes/router.js")
server.use(router)

server.use(function(req, res, next) {
  res.locals.user = req.session.user;    
  next();
});

server.get("*", (req, res)=>{
	res.redirect("/")
})
//server

let config = {
  port: process.env.port || 8080
}

server.listen(config.port, ()=>{
	console.log(`server on port ${config.port}`)
})