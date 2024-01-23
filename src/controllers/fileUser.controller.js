const { addFileOfUser, getFilesOfUserD, getSpecificTypeOfDocument, getFileByName, deleteFileOfUser, updateNameOfFileOfUser } = require("../domain/services/services-filesuser")
const { verifyToken } = require("../middlewares/AuthJwt")
const router=require("express").Router()

router.post("/",verifyToken,addFileOfUser)
router.get("/",verifyToken,getFilesOfUserD)
router.get("/byType",verifyToken,getSpecificTypeOfDocument)
router.get("/byName",verifyToken,getFileByName)
router.delete("/",verifyToken,deleteFileOfUser)
router.patch("/",verifyToken,updateNameOfFileOfUser)

module.exports=router
