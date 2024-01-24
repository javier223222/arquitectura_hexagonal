const {addUser,getAllUsers,getById,getByUsername} = require('../orm/users.orm')
const {getToken} = require("../repositories/respository.jwt")
const brycpt = require('bcrypt')
const saltos = parseInt(process.env.SALTOS)
const addNewUser = async (req,res) =>{
    try{
        const newUser = {
            name:req.body.name,
            lastName:req.body.lastName,
            username:req.body.username,
            email:req.body.email,
            password:brycpt.hashSync(req.body.password,saltos)
        }
        await addUser(newUser)
        return res.status(201).json({
            message:"Usuario agregado correctamente",
            success:true,
        })
    }catch(error){
        return res.status(500).json({
            message:"Error al agregar usuario",
            success:false,
        })
    }
}

const getAllUsersM = async (req,res) =>{
    try{
        const result = await getAllUsers()
        return res.status(200).json({
            message:"Usuarios obtenidos correctamente",
            data:result,
            success:true,
        })
    }catch(error){
        return res.status(500).json({
            message:"Error al obtener usuarios",
            error:error.message,
            success:false,
        })
    }
}
const getByIdS = async (req,res) => {
    try{
        const [result] = await getById(req.params.id)
        if(!result){
            return res.status(404).json({
                message:"Usuario no encontrado",
                success:false,
            })
        }
        return res.status(200).json({
            message:"Usuario obtenido correctamente",
            data:result,
            success:true,
        })
    }catch(error){
        return res.status(500).json({
            message:"error al obtener usuario",
            error:error.message,
        })
    }
}
const loginUser = async (req,res) =>{
    try{
        const [user] = await getByUsername(req.body.username)
        
        if(!user){
            return res.status(404).json({
                message:"usuario o password incorrecto",
                success:false,
            })
        }
        
        const validPassword = brycpt.compareSync(req.body.password,user.password)
        if(!validPassword){
            return res.status(401).json({
                message:"usuario o password incorrecto",
                success:false,
            })
        }
        const token = await getToken(user)
        return res.status(200).json({
            message:"Usuario logeado correctamente",
            success:true,
            token:token,
        })
    }catch(error){
        return res.status(500).json({
            message:"Error al iniciar sesion",
            error:error.message,
            success:false,
        })
    }
}

module.exports ={
    addNewUser,
    getAllUsersM,
    getByIdS,
    loginUser
}