const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

connectDb();

// middleware
// express middleware to parse body of request
app.use(express.json());
app.use("/api/contacts",require("./routes/contactRoutes"));
app.use("/api/user",require("./routes/userRoutes"));
app.use(errorHandler);

// Routes
// app.get("/api",(req,res)=>{
//     res.status(300).send("code")
//     // res.send("welcome to node");
// })

app.listen(port,()=>{
    console.log("Server is running on port",port);
})