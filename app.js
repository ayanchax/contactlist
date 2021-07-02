//importing modules for server side code
const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const cors = require("cors");
const path = require("path");
const router = require("./routes/route");
const app = express();

//1 add middleware setup
app.use(cors());
app.use(bodyparser.json());

//2 static files setup __dirname is the project root. Our static file location are stored in public folder under root directory
// All the display on the UI will be refered from this location's index.html keeping it as a display wrapper for all the various display rendering
app.use(express.static(path.join(__dirname, "public")));

// api/router setup
app.use("/api", router);

// this method runs at the entry point of starting the applications
// Listening to the express server.
const port = 3000; //port number
app.listen(port, () => {
    console.log("Application Server started at port: " + port);
});

// DB CONNECT
// connect app to mongodb(no-sql) server by creating a new collection  contactlist in mongodb
const mongoConnectionString = "mongodb://localhost:27017/contactlist";
mongoose
    .connect(mongoConnectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("DB Server Connected to Mongo DB @ 27017");
    })
    .catch((err) => {
        console.error(
            "Error Connecting to Mongo DB Server @ 27017->" + err.message
        );
        process.exit(-1);
    });