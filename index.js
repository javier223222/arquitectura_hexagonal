const app = require("./src/server")
require("dotenv").config()
const PORT =process.env.PORT||5000

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})
