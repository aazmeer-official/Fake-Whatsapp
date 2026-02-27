// BASIC REQUIREMENTS
const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const Chat = require("./models/chat.js")

// EXPRESS REQUIREMENTS

app.use(express.urlencoded({extended:true}))  //For Parsing
app.set("view engine", "ejs") //For setting view engine
app.set("views",path.join(__dirname,"views")) //For conecting views folder
app.use(express.static(path.join(__dirname,"public"))) // For connecting Public Folder
app.use(methodOverride('_method'))

// DATABASE REQUIREMENTS

main()
.then(()=>{console.log("connection Successful")})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}


// Express App
 
app.get("/",(req,res)=>{
    res.send("Response")
})

// Index Route 
app.get("/chats",async (req,res)=>{
    let allChats = await Chat.find()
    res.render("chats.ejs",{allChats})
})


// Show Route 
app.get("/chats/:id",async (req,res)=>{
    let {id} = req.params;
    let chat = await Chat.findById(id)
    console.log(chat)
    res.render("show.ejs",{chat})
})


// POST Request - Addition of Chats

app.post("/chats",async (req,res)=>{
    let {msg} = req.body;
    Chat.insertOne({
        from: "Aazmeer",
        to : "Aazmeer",
        msg: msg,
        created_at: new Date()
    })
    res.redirect("/chats")
})

// Listening Port
app.listen(port,()=>{
    console.log("server is listening...")
})

