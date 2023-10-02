import express from "express"
import { 
  getTeachers,
  getSingleTeacher,
  deleteTeacher,
  getDivisions,
  updateTeacher,
  addTeacher
} from "../controllers/admin.js"

const router = express.Router()

router.get("/teachers",getTeachers)
router.get("/teacher/:id",getSingleTeacher)
router.get("/divisions",getDivisions)
router.delete("/teacher/:id",deleteTeacher)
router.put("/updateTeacher/:id",updateTeacher)
router.post("/addTeacher",addTeacher)

export default router