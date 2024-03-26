// file type: mjs because that allows it to read the ES6 import syntax (for import and export, and probably other things too)
// https://nodejs.org/docs/latest/api/esm.html - for more research on ES6 modules in Node.js
import dotenv from 'dotenv';
dotenv.config({ path: './.env.local' });

import express from "express"; 
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";


import artistRoute from "./routes/artist_route.mjs";
import albumRoute from "./routes/album_route.mjs";
import debugPersonRoute from "./routes/debug_person_route.mjs";
import loginRoute from "./routes/login_route.mjs";
import registerRoute from "./routes/register_route.mjs";
import userAuthRoute from "./routes/user_auth_route.mjs";

// Create express app
const app = express(); // defines express app for handling requests

// Middleware for handeling JSON data and allowing database requests

// Origins allowed to make requests to the server, add production later
//const allowedOrigins = ['http://localhost:3000'
                      /*'Production_URL.com',*///];
                      
const FRONT_URL = process.env.REACT_APP_FRONT_URL;
console.log(FRONT_URL);
// Customized CORS - Similar to the manual approach
const corsOptions = {
    origin: FRONT_URL, // This should be the URL of the front-end app
    credentials: true, // This is important for cookies, authorization headers with HTTPS 
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'x-access-token', 'Authorization'],
};
app.use(cors(corsOptions));

app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
app.use(cookieParser()); // Use cookie-parser middleware

// Session middleware, handles session data / cookies
app.use(session({
    key: "user_id",
    secret: "c@01M24MWUhBCNd&!sNS84Chc",
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        maxAge: 60 * 60 * 1000 * 2, // 2 hours
        SameSite: "Lax",
    }
}));

// Routes

app.use("/artists", artistRoute);
app.use("/albums", albumRoute);
app.use("/debug_person", debugPersonRoute);
app.use("/login", loginRoute);
app.use("/register", registerRoute);
app.use("/user_auth", userAuthRoute);

/* 
Moving the below 
app.get('/library', (req, LIBRARY page",
        "msg" : "This is my first page",
        "username": "PeterShaba"
    }];
    res.json(str); // Send JSON response
});
app.get('/recentsname": "Coder Peter Shaba",
        "msg" : "This is my first page",
        "username": "PeterShaba"



// Will be where we start direction routes
app.get("/", (req, res) => {
    res.send("Responding to GET /");
    console.log("Responding to GET /");
});

// Test to get all people from db
app.get("/persons", (req, res) => {
    //res.send("Responding to GET /persons");
    console.log("Responding to GET /persons");
    const q = "SELECT * FROM person";
    db.query(q, (err, result) => {
        if (err) throw err;

        res.json(result);
    });
    
});
*/

// Start server listening on port 8080
app.listen(8080, () => {
    console.log("We stan Uma!");
    console.log("Server is running on port 8080");
});

