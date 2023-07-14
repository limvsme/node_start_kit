import express from "express";
import cors from "cors";
import userRouter from "./src/router/user-router.js";
import nunjucks from "nunjucks";

const server = express();

// view engine 설정 (nunjucks)
server.set("view engine", "html");
nunjucks.configure("./views/account-orders", {
  express: server,
});

server.get("/express", (req, res) => {
  res.render("account-orders.html");
});

// 정적 파일 제공을 위한 미들웨어 설정
server.use(express.static("public"));

// CORS 에러 방지
server.use(cors());
// Content-Type: application/x-www-form-urlencoded 형태의 데이터를 인식하고 핸들링할 수 있게 함.
server.use(express.urlencoded({ extended: false }));
// Content-Type: application/json 형태의 데이터를 인식하고 핸들링할 수 있게 함.
server.use(express.json());

// Router 요청시 /api를 사용 요청
server.use("/api", userRouter);

// 서버 연결, DB연결, middleware,
// DB 연결하면서 클라이언트한테 회원가입과 로그인 API를 전달!!

// JWT 토큰을 활용하는 방법 -> 쿠키, 로컬스토리지
// DB 호출/조회

// 로그인

export { server };
