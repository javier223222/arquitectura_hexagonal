const {addNewUser,getAllUsersM,getByIdS} = require("../domain/services/services-user")
const router = require("express").Router();

router.post("/",addNewUser)
router.get("/",getAllUsersM)
router.get("/:id",getByIdS)

module.exports = router;