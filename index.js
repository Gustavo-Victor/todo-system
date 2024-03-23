// modules
import express from "express";
import exphbs from "express-handlebars"; 
import conn from "./db/conn.js"; 
import taskRouter from "./routes/taskRouter.js"; 


// express
const app = express(); 
const port = 3000;


//handlebars
const hbs = exphbs.create({
    partialsDir: ["views/partials"]
}); 
app.engine("handlebars", hbs.engine); 
app.set("view engine", "handlebars"); 


// body data
app.use(express.urlencoded({ extended: true}));
app.use(express.json()); 

//routes 
app.use("/tasks", taskRouter); 


// assets
app.use(express.static("public")); 



// pages / routes processing
app.get("/", (req, res) => {
    res.render("home"); 
});



// connect and create tables
conn.sync()
    .then(resp => {
        app.listen(port, () => {
            console.log("Successfully connected.");
            console.log(`App is running on http://localhost:${port}`); 
        });         
    })
    .catch(e => {
        console.log("Connection failure.");
        console.log(e); 
    });




