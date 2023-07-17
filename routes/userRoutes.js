const express = require("express")
const { UserModle } = require("../modle/userModle")
const jwt=require("jsonwebtoken")
const bcrypt = require("bcrypt")

const userRouter = express()


userRouter.post("/users/register", (req, res) => {
    const { name, email, gender, password } = req.body;
    try {
        bcrypt.hash(password, 5, async (err, hash) => {
            if (err) {
                res.status(400).json({ err })
            } else {
                const data = new UserModle({ ...req.body, password: hash });
                await data.save()
                res.status(200).json({ "msg": "User Registerd Successfully" })
            }
        })

    } catch (error) {
        res.status(400).json({ error })
    }
})
userRouter.post("/users/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const data = await UserModle.findOne({ email: email })
        if (data) {
            bcrypt.compare(password, data.password, (err, result)=> {
                if(result){
                    let token = jwt.sign({ email: email }, "masai");
                    res.status(200).json({msg:"Login Successful",token})
                }else{
                    res.status(400).json({msg:"Please enter correct password"})
                }
            });
        }


    } catch (error) {
        res.status(400).json({error})
    }
})

module.exports = { userRouter }