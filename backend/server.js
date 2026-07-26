const express = require("express");
const cors = require("cors");

const cloudRoutes = require("./routes/cloud");

const app = express();


app.use(cors());
app.use(express.json());


// Test API
app.get("/", (req,res)=>{

    res.json({
        message:"Cloud Dashboard API Running"
    });

});


// Cloud routes
app.use("/api/cloud", cloudRoutes);



const PORT = 5000;


app.listen(PORT,()=>{

    console.log(
        `Server running on port ${PORT}`
    );

});