import { db } from "../db.js"

export const getTeachers = (req,res) => {
  const sql = "SELECT t.id, t.first_name, t.last_name, t.email, d.name 'division', u.name 'university' FROM teachers t LEFT JOIN divisions d ON t.division_id=d.id LEFT JOIN universities u ON t.uid=u.id"

  db.query(sql, (err, result) => {
    if(err) return res.json(err)
    if(result.length === 0) return res.status(404).json("Failed to get teachers")

    res.status(200).json({Result : result})
    

  })

}

export const getSingleTeacher = (req,res) => {
  const sql = "SELECT t.id, t.first_name, t.last_name, t.email, d.name 'division', u.name 'university' FROM teachers t LEFT JOIN divisions d ON t.division_id=d.id LEFT JOIN universities u ON t.uid=u.id WHERE t.id = ?"

  db.query(sql,[req.params.id], (err,result) => {
    if(err) return res.json(err)
    return res.status(200).json({Result : result})
  })
}

export const deleteTeacher = (req,res) => {

}

export const getDivisions = (req,res) => {
  const sql = "SELECT * FROM divisions"

  db.query(sql, (err, result) => {
    if(err) return res.json(err)
    if(result.length === 0) return res.status(404).json("Failed to get teachers")

    res.status(200).json({Result : result})
    

  })
}