import { db } from "../db.js"
import bcrypt from "bcryptjs"
import nodemailer from "nodemailer"

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

export const updateTeacher = (req,res) => {
  const teacherId = req.params.id
  const sql = "UPDATE teachers t LEFT JOIN divisions d ON t.division_id=d.id LEFT JOIN universities u ON t.uid=u.id SET t.first_name = ?, t.last_name = ?, t.email = ?, t.uid = (SELECT id FROM universities WHERE name = ?), t.division_id = (SELECT id FROM divisions WHERE name = ?) WHERE t.id = ?"

  const values = [req.body.first_name, req.body.last_name, req.body.email, req.body.organisation, req.body.division]

  db.query(sql, [...values, teacherId], (err, result) => {
    if (err) return res.status(500).json(err)
    return res.status(200).json("Post has been updated.")
  })
}

export const addTeacher = (req,res) => {
  //Check null
  const {first_name,last_name,email,organisation} = req.body

  if( !first_name || !last_name || !email || !organisation) {
    return res.status(400).json("All information need to be filled")
  }

  // Check existing teacher
  const q = "SELECT * FROM teachers WHERE email = ?"

  db.query(q,[req.body.email],(err,data) => {
    if(err) return res.json(err)
    if(data.length) return res.status(409).json("Teacher already exists!")

    // Create a random password
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    for (let i = 0; i < 8; i++) {
      password += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password,salt)

    // Insert Teacher
    const q = "INSERT INTO teachers(`first_name`,`last_name`,`password`,`email`,`uid`) VALUES (?,?,?,?,(SELECT id FROM universities where name = ?))"

    db.query(q,[req.body.first_name,req.body.last_name,hash,req.body.email,req.body.organisation],(err,data) => {
      if(err) return res.status(500).json(err)
      return res.status(200).json("Teacher has been created!")
    })

    const transporter = nodemailer.createTransport({
      service: "outlook",
      auth: {
        user : "js980923@outlook.com",
        pass : "xy580303"
      }
    })
    
    const option = {
      from : "js980923@outlook.com",
      to : email,
      subject : "Test Question Bank",
      html : `<p>Kia Ora ${first_name}</p>
      <br/>
      <p>Welcome to our website, your email for you to login is <strong>${email}</strong> , and your initial password is <strong>${password}<strong>, we recommend that you change it after logging in.</p>
      <br/>
      <p>If you meet any problem, please contact us</p>
      </br></br>
      <p>Regards</p>
      </br>
      <p>Jade Shi</p>
      `
    }
    
    transporter.sendMail(option, function(err,info){
      if(err){
        console.log(err)
        return
      }
      console.log("Sent: "+info.response);
    })

  })
}