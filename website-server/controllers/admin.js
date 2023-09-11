import { db } from "../db.js"

export const getTeachers = (req,res) => {
  const sql = "SELECT id, img, first_name, last_name, email, mobile, division_id, uid FROM teachers"

  db.query(sql, (err, result) => {
    if(err) return res.json(err)
    if(result.length === 0) return res.status(404).json("Failed to get teachers")

    res.status(200).json({Result : result})
    

  })

}
