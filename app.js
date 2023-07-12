import express from "express";
import cors from "cors";
import userRouter from "./src/router/user-router.js";
import dotenv from "dotenv";
import mongoose from "mongoose";

const app = express();

// .env에서 환경변수 불러오기
dotenv.config();
// CORS 에러 방지
app.use(cors());

// Content-Type: application/x-www-form-urlencoded 형태의 데이터를 인식하고 핸들링할 수 있게 함.
app.use(express.urlencoded({ extended: false }));
// Content-Type: application/json 형태의 데이터를 인식하고 핸들링할 수 있게 함.
app.use(express.json());

app.use("/api", userRouter);

const port = 3000;

app.listen(port, () => {
  console.log(`app listening on port ${port}!`);
});
