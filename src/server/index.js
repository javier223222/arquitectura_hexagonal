const express=require("express")
require("dotenv").config()
const cors=require("cors")
const fileUpload=require("express-fileupload")


const app=express()

app.use(cors())
app.use(express.json())
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"./uploads"
}))
app.use("/user",require("../routes/index"))
app.get("/",(req,res)=>{
    res.send("<h1>Welcome to mi app </h1>")
})


module.exports=app