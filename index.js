var express = require("express");
var bodyParser = require("body-parser");
var config = require("config");
var app = express();
var port = config.get("server.port");
var session = require("express-session");
var moment = require('moment');
var socketio = require("socket.io");
//body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: config.get("secret_key"),
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

app.set("views",__dirname+"/apps/views");
app.set("view engine","ejs");
//static folder
app.use("/static", express.static(__dirname+"/public"));
var controllers = require(__dirname+"/apps/controllers");
app.use(controllers);

app.get("/",function(req,res){
    res.json({"message": "This is Admin Page"});
})

app.get("/signup", function(req,res){
    res.render("signup", {data:{}});  
})


var server = app.listen(port,function(){
    console.log("App listening on port: ",port);
})

var io = socketio(server);
var socketcontrol = require("./apps/common/socketcontrol")(io);



// exports.dashboard = function(req, res) {
//     res.render('dashboard', { moment: moment });
// }