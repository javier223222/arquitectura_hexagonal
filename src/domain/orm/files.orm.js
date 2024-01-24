const {createPool}=require("../repositories/repository_mysql")

const addFile=async(iduser,file)=>{
    try{
      const pool=await createPool()
      console.log(iduser,file.urlFile,file.public_id_file,file.typeFile,file.nameFile)
      const query=await pool.execute(`insert into fileOfUser(idUser,urlFile,public_id_file,typeFile,naemFile) 
                                     values(?,?,?,?,?)`,[iduser,file.urlFile,file.public_id_file,file.typeFile,file.nameFile])
        return true
    }catch(error){
    
        throw new Error(error)
    }
}

const getFilesOfUser=async(iduser)=>{
    try{
     const pool=await createPool()
     const [result]=await pool.query(`select idFileUser,idUser,urlFile,public_id_file,typeFile,naemFile from 
                                      fileOfUser where idUser=?`,[iduser])
      return result
    }catch(e){
        throw new Error(e)
    }
}


const getSpecificTypeOfDocumen=async(iduser,type)=>{
    try{
     const pool=await createPool()
     const [result]=await pool.query(`select idFileUser,idUser,urlFile,public_id_file,typeFile,naemFile from 
     fileOfUser  where idUser=? and typeFile=?`,[iduser,type])
     return result

    }catch(e){
        throw new Error(e)
    }
}

const getNameOfFile=async(iduser,name)=>{
    try{
     const pool=await createPool()
     const [result]=await pool.query(`select idFileUser,idUser,urlFile,public_id_file,typeFile,naemFile from 
     fileOfUser  where idUser=? and naemFile=? `,[iduser,name])
    return result
    }catch(e){
        throw new Error(e)
    }
}

const deleteFile=async(iduser,idfile)=>{
    try{
     const pool=await createPool()
     const [result]=await pool.query("delete from fileOfUser where idUser=? and idFileUser=?",[iduser,idfile])
     return result
    }catch(e){
        throw new Error(e)
    }
}

const updateNameFile=async(iduser,idfile,name)=>{
    try{
     const pool=await createPool()
     const [result]=await pool.query("update fileOfUser set naemFile=? where idUser=? and idFileUser=?",[name,iduser,idfile])
     return result
    }catch(e){
        throw new Error(e)
    }
}


module.exports={
    addFile,
    getFilesOfUser,
    getSpecificTypeOfDocumen,
    getNameOfFile,
    deleteFile,
    updateNameFile
}