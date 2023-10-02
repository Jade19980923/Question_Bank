import { db } from "../db.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
//import nodemailer from "nodemailer"

export const signup = (req,res) => {
  //Check email
  const {email, confirm_email} = req.body
  if(email != confirm_email) {
    return res.status(400).json("Email and Confirm Email do not match")
  }
  // Check existing user
  const q = "SELECT * FROM teachers WHERE email = ?"

  db.query(q,[req.body.email],(err,data) => {
    if(err) return res.json(err)
    if(data.length) return res.status(409).json("User already exists!")

    // Create a user and Encrypt the password
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(req.body.password,salt)

    // Insert user
    const q = "INSERT INTO teachers(`first_name`,`last_name`,`password`,`email`) VALUES (?)"
    const values = [
      req.body.first_name,
      req.body.last_name,
      hash,
      req.body.email,
      //req.body.confirm_email,

    ]


    db.query(q,[values],(err,data) => {
      if(err) return res.json(err)
      return res.status(200).json("User has been created!")
    })

  })
}

export const login = (req,res) => {
  // Check non-exist user
  const q = "SELECT * FROM teachers WHERE email = ?"

  db.query(q,[req.body.email], (err, data) => {
    if(err) return res.json(err)
    if(data.length === 0)  return res.status(404).json("User not found") // user doesn't exist

    // Check password
    const isPasswordCorrect = bcrypt.compareSync(req.body.password, data[0].password) // Compare the password
    
    if(!isPasswordCorrect) return res.status(400).json("Wrong password")

    const token = jwt.sign({id:data[0].id}, "jwtkey")
    const { password, ...other } = data[0]

    res.cookie("access token", token, {
      httpOnly:true
    }).status(200).json(data[0])
  })
}

export const loginAsAdmin = (req,res) => {
  // Check non-exist admin
  const q = "SELECT * FROM admin WHERE email = ?"

  
  db.query(q,[req.body.email], (err, data) => {
    if(err) return res.json(err)
    if(data.length === 0)  return res.status(404).json("Admin not found") // user doesn't exist

    // Check password
    const isPasswordCorrect = bcrypt.compareSync(req.body.password, data[0].password) // Compare the password
    
    if(!isPasswordCorrect) return res.status(400).json("Wrong password")

    const token = jwt.sign({id:data[0].id}, "jwtkey")
    const { password, ...other } = data[0]

    res.cookie("access token", token, {
      httpOnly:true
    }).status(200).json(data[0])
  })
}

export const logout = (req,res) => {
  
}