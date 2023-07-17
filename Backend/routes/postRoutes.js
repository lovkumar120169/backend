const express = require("express")
const { PostModle } = require("../modle/postModle")

const postRouter = express()


postRouter.get("/posts", async (req, res) => {
    const { device } = req.query;

    try {
        if (device) {
            const data = await PostModle.find({ email: req.body.user, device: device })
            res.status(200).json({ msg: `data of ${req.body.user} is`, data })
        } else {
            const data = await PostModle.find({ email: req.body.user })
            res.status(200).json({ msg: `data of ${req.body.user} is`, data })
        }

    } catch (error) {
        res.status(400).json({ error })

    }
})

postRouter.post("/posts", async (req, res) => {
    const { title, body, device } = req.body;
    try {
        const data = new PostModle({ ...req.body, email: req.body.user })
        await data.save()
        res.status(200).json({ msg: "data is added", data })
    } catch (error) {
        res.status(400).json({ error })
    }
})

postRouter.patch("/posts/update/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const { title, body } = req.body
        const data = await PostModle.findOneAndUpdate({ email: req.body.user, _id: id }, { $set: { "title": title, "body": body } })
        res.status(200).json({ data })
    } catch (error) {
        res.status(400).json({ error })
    }

})

postRouter.delete("/posts/delete/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const data = await PostModle.findOneAndDelete({ email: req.body.user, _id: id })
        res.status(200).json({ data })
    } catch (error) {
        res.status(400).json({ error })
    }
})


module.exports = { postRouter }