import express from "express"
import { 
  getTeachers,
  getSingleTeacher,
  deleteTeacher,
  getDivisions
} from "../controllers/admin.js"

const router = express.Router()

router.get("/teachers",getTeachers)
router.get("/teacher/:id",getSingleTeacher)
router.get("/divisions",getDivisions)
router.delete("/teacher/:id",deleteTeacher)

export default router