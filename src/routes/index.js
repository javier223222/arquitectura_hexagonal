const router=require("express").Router()
router.get("/",(req,res)=>{
    res.send("<h1>API REST for upload files</h1>")
})
router.use("/files",require("../controllers/fileUser.controller"))
module.exports=router