import express from "express"
import { getTeachers } from "../controllers/admin.js"

const router = express.Router()

router.get("/home",getTeachers)

export default router