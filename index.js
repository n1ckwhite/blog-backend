import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import cors from 'cors';
import {
  registerValidation,
  loginValidation,
  postCreateValidation,
} from "./validations.js";
import { UserController, PostController } from "./controllers/index.js";
import { handleValidationErrors, checkAuth } from "./utils/index.js";
mongoose
  .connect(
    "mongodb+srv://admin:mars1479zd@cluster0.b0dgk2u.mongodb.net/blog?retryWrites=true&w=majority"
  )
  .then(() => console.log("DB ok"))
  .catch((err) => console.log("DB ", err));

const app = express();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });
app.use(cors())
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});
app.post(
  "/auth/login",
  loginValidation,
  handleValidationErrors,
  UserController.login
);

app.get("/auth/me", checkAuth, UserController.getMe);

app.post(
  "/auth/register",
  registerValidation,
  handleValidationErrors,
  UserController.register
);
app.get("/posts/:id", PostController.getOne);
app.get("/posts", PostController.getAll);

app.post(
  "/posts",
  checkAuth,
  handleValidationErrors,
  postCreateValidation,
  PostController.create
);
app.delete(
  "/posts/:id",
  checkAuth,
  handleValidationErrors,
  PostController.remove
);
app.patch(
  "/posts/:id",
  checkAuth,
  handleValidationErrors,
  postCreateValidation,
  PostController.update
);

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("Server OK!");
});
