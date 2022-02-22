import express from "express";
import mongoose from "mongoose";
import AuthRouter from "./routes/Authentication";
import UserRoute from "./routes/User";
import PostRoute from './routes/Post';
import CategoryRoute from "./routes/Category";
import cors from "cors";
import multer from "multer";
import path from "path"
const app = express();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images")
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name)
    },
})
const upload = multer({ storage });



//cors - origin 
// app.use(
//     cors({
//       origin: "*",
//       methods: "GET,POST,PUT,DELETE",
//       credentials: true,
//     })
// );
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));
app.use('/auth', AuthRouter);
app.use('/users', UserRoute);
app.use('/posts', PostRoute);
app.use('/categories', CategoryRoute);


///multer uploaded--post
app.post('/api/upload', upload.single('file'), (req, res) => {
    try {

        res.status(200).json("this file is uploaded")

    } catch (error) {
        res.status(500).json("file upload is failed")
    }
});

///mongo-connection
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(console.log("Database is connecting!"))
    .catch(error => console.log(error));

///run-server
app.listen(5000, () => {
    console.log("Server running! ")
})