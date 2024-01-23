require("dotenv").config()
const mysql2=require("mysql2/promise")

const config={
    host:process.env.HOST,
    user:process.env.USERMYSQL,
    password:process.env.PASSWORDMYSQL,
    database:process.env.DB,
    port:process.env.PORTMYSQL
}

const createPool=async()=>{
    return mysql2.createConnection(config)
}


module.exports={
    createPool
}