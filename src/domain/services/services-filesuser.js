const { addFile, getFilesOfUser, getSpecificTypeOfDocumen, getNameOfFile, deleteFile, updateNameFile } = require("../orm/files.orm")
const { uploadImage, deleteImage } = require("../repositories/repository_cloundinary")
const { getTokenData } = require("../repositories/respository.jwt")
const fs=require("fs-extra")
const addFileOfUser=async(req,res)=>{
    try{
      const {typeFile,nameFile}=req.body
      const  result=await getTokenData(req.headers["x-access-token"])
      const {idUser}=result.data

      if(req.files?.fileUser){
            const image=await uploadImage(req.files.fileUser.tempFilePath)            
            await addFile(idUser,{urlFile:image.secure_url,public_id_file:image.public_id,typeFile:typeFile,nameFile:nameFile})

            await fs.unlink(req.files.fileUser.tempFilePath)
            
            return res.status(201).json({
                success:true,
                message:"Archivo subido correctamente"
            })

      }

      return res.status(400).json({
          success:false,
          message:"Archivo no encontrado"
      })


    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Error al subir el archivo",
            error:error.message
        
        })
    }
}

const getFilesOfUserD=async(req,res)=>{
 
    try{
     const result=await getTokenData(req.headers["x-access-token"])
     const {idUser}=result.data
     const files=await getFilesOfUser(idUser)
     return res.status(200).json({
        success:true,
        message:"Archivos obtenidos correctamente",
        files
     })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Error al obtener los archivos"
         })
    }
}

const getSpecificTypeOfDocument=async(req,res)=>{
    try{
     const result=await getTokenData(req.headers["x-access-token"])
     const {idUser}=result.data
     const {type}=req.query
     const files=await getSpecificTypeOfDocumen(idUser,type)
     return res.status(200).json({
        success:true,
        message:"Archivos obtenidos correctamente",
        files
     })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Error al obtener los archivos"
         })
    }
}   

const getFileByName=async(req,res)=>{
    try{
    const result=await getTokenData(req.headers["x-access-token"])
    const {idUser}=result.data
     const {nameFile}=req.query
    const files=await getNameOfFile(idUser,nameFile)
    return res.status(200).json({
        success:true,
        message:"Archivos obtenidos correctamente",
        files
    })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Error al obtener los archivos"
        })
    }
}

const deleteFileOfUser=async(req,res)=>{
    try{
     const result=await getTokenData(req.headers["x-access-token"])
     const {idUser}=result.data
     const {idFileUser,publicId}=req.query
     const file=await deleteFile(idUser,idFileUser)
     await deleteImage(publicId)
     return res.status(200).json({
        success:true,
        message:"Archivo eliminado correctamente"
     })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Error al eliminar el archivo"
        })
    }
}

const updateNameOfFileOfUser=async(req,res)=>{
    try{
        const result=await getTokenData(req.headers["x-access-token"])
        const {idUser}=result.data
        const {idFileUser,nameFile}=req.body
        const file=await updateNameFile(idUser,idFileUser,nameFile)
        return res.status(200).json({
            success:true,
            message:"Archivo actualizado correctamente"
        })

    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Error al actualizar el archivo",
            error:error.message
        })
    }
}


module.exports={
    addFileOfUser,
    getFilesOfUserD,
    getSpecificTypeOfDocument,
    getFileByName,
    deleteFileOfUser,
    updateNameOfFileOfUser
}