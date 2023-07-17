const express=require("express")
const {connection}=require("./db")
const {userRouter}=require("./routes/userRoutes")
const {postRouter}=require("./routes/postRoutes")
const {auth}=require("./middleware/auth.middleware")
const app=express()

app.use(express.json())

app.use("/users",userRouter)
app.use(auth)
app.use("/posts",postRouter)


app.listen(8080,async()=>{
    try {
        await connection;
        console.log("DB is connected")
    } catch (error) {
        console.log("Something went wrong")
        console.log(error) 
    }
})