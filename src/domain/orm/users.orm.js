const {createPool} = require('../repositories/repository_mysql')


const addUser = async (user) => {
    try{
        const pool=await createPool()
        console.log(user)
        const query=await pool.execute(`insert into users(name,lastName,username,email,password) 
                                       values(?,?,?,?,?)`,[user.name,user.lastName,user.username,user.email,user.password])

                                    
          return true
      }catch(error){
          return false
      }
}
const getAllUsers = async () => {
    try{
        const pool=await createPool()
        const [result]=await pool.query("select idUser,name,lastName,username,email,password from users")
          return result
      }catch(error){
          return false
      }
}
const getById = async (id) => {
    try{
        const pool = await createPool()
        const [result] = await pool.query("select idUser,name,lastName,username,email,password from users where idUser=?",[id])
        return result
    }catch(error){
        return false
    }
}
const getByUsername = async (username) => {
    try{
        const pool = await createPool()
        const [result] = await pool.query("select idUser,name,lastName,username,email,password from users where username=?",[username])
        return result
    }catch(error){
        return false
    }
}

module.exports = {
    addUser,
    getAllUsers,
    getById,
    getByUsername,
}