const express =require('express')
const authcontroller =require ("../controllers/auth.controllers");
const authMiddleware =require("../middleware/authmiddleware")

const router =express.Router();



router.post("/register", authcontroller.registerUser);
router.post("/login", authcontroller.loginUser);
router.post("/logout", authcontroller.logoutUser);
router.get("/me", authMiddleware, authcontroller.getMe);

module.exports = router;

