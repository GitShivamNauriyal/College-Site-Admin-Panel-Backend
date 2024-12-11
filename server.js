import express from "express";
import "dotenv/config";
import apiRoutes from "./Routes/api.js"; //import Routes
import bodyParser from "body-parser";
import CookieParser from "cookie-parser";
import cors from "cors";
import fileUpload from "express-fileupload";
import helmet from "helmet";
//import {limiter} from "./config/rateLimiter.js"
const app = express();

const PORT = process.env.PORT;

console.log("Working");
app.get("/", (req, res) => res.send("WORKING"));
app.listen(PORT, () => console.log(`LISTENING TO PORT ${PORT}`));

//  Middleware
//app.use(limiter);
//app.use(helmet())
app.use(cors());

// app.use(
//     cors({
//         origin: "*", // Allow requests from any origin
//         methods: "GET,POST,DELETE,PUT", // Specify allowed methods
//         allowedHeaders: "Content-Type,Authorization", // Specify allowed headers
//     })
// );
app.use(express.urlencoded({ extended: false }));
app.use(fileUpload());
app.use(express.static("public")); // to access image using url
app.use(bodyParser.json());
app.use(CookieParser());
app.use("/api", apiRoutes);
