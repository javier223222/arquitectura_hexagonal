const {addNewUser,getAllUsersM,getByIdS,loginUser} = require("../domain/services/services-user")
const router = require("express").Router();

router.post("/",addNewUser)
router.get("/",getAllUsersM)
router.get("/:id",getByIdS)
router.post("/login",loginUser)

module.exports = router;