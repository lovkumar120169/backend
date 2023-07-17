const express = require("express")
const jwt = require("jsonwebtoken")

const app = express()

app.use(express.json())

const auth = async (req, res, next) => {
    const token = await req.headers.authorization.split(" ")[1];
    try {
        if (token) {
            const decode = jwt.verify(token, "masai");
            if (decode) {
                req.body.user = decode.email;
                console.log(decode.email)
                next()
            } else {
                res.status(400).json({ msg: "password dosenot matched" })
            }
        } else {
            res.status(400).json({ msg: "password dosenot matched" })
        }
    } catch (error) {
        res.status(400).json({ error })
    }
}

module.exports = { auth }
