const express = require('express');
const cors = require('cors');


const AuthRouter = require('./Routes/user.route');
const connection=require("./db")
const auth=require("./middleware/auth.middleware")
const doctorRouter=require("./Routes/doctor.route")

const app = express();
require("dotenv").config()
const PORT = process.env.PORT ;

app.use(cors());
app.use(express.json());

app.use('/auth', AuthRouter);
app.use('/doctors',auth,doctorRouter)

app.listen(PORT, async () => {
    try {
        await connection;
        console.log(`Server is running on port ${PORT}`);
        console.log("Connected to mongodb")
        
    } catch (error) {
        console.log("error connecting to db")
        console.log(error)
    }
});
