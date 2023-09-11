import express from "express"
import { signup,login,loginAsAdmin,logout } from "../controllers/auth.js"

const router = express.Router()

router.post("/signup",signup)
router.post("/login",login)
router.post("/admin",loginAsAdmin)
router.post("/logout",logout)

export default router