const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db")
const categoryRouter = require("./router/categoryRouter")
const productRouter = require("./router/productRouters")
const authRouter = require("./router/authRouter")
const cartRouters = require("./router/cartRouter")
const paymentRouter = require("./router/paymentRouter")
const app = express()

connectDB()

dotenv.config()

app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174","*"],
    allowedHeaders: ["Content-Type", "Authorization", "auth-token"],
    methods: ["GET","POST","PUT","PATCH", "DELETE"],
    credentials: true
}))

app.use(express.json())
app.use("/uploads", express.static("uploads"))
app.use("/", categoryRouter)
app.use("/", productRouter)
app.use("/", authRouter)
app.use("/", cartRouters)
app.use("/", paymentRouter)


const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`listing on port ${port}`));