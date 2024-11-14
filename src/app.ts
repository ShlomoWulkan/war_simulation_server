import express  from "express";
import 'dotenv/config'
import cors from "cors"
import authRoute from "./routes/authRoute"
import attackRoute from "./routes/attackRoute"
import userRoute from "./routes/userRoute"
import connectDB from "./config/db";
import http from "http";
import { Server } from "socket.io";
import { handleSocketConnection } from "./socket/io";

const port = process.env.PORT || 3001
const app = express();
const httpServer = http.createServer(app);

export const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods:"*"
    }
})

io.on("connection", handleSocketConnection)

connectDB()

app.use(express.json())
app.use(cors())
app.use("/api/auth", authRoute)
app.use("/api/attacks", attackRoute)
app.use("/api/users", userRoute)

httpServer.listen(port, () => {
    console.log(`Server is up and running on port ${port}`)
})
