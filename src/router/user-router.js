import express from "express";
import UserService from "../services/user-service.js";

const userRouter = express.Router();

// 회원가입 API
userRouter.post("/addUser", async (req, res, next) => {
  const { name, email, password, phone } = req.body;

  // if로 req가 null, undefined일 경우를 생각해 오류를 미리 막아라.. 왜냐하면 try catch는 회원가입의 대한 오류이지 값에 대한 오류가 아니다.

  try {
    // 각 데이터를 유저 DB에 추가하기
    const newUser = await new UserService().addUser({
      name,
      email,
      password,
      phone,
    });

    console.log(process.env);
    // 회원가입 성공시 DB에 저장한 데이터를 프론트로 보냄,
    res.status(200).json({ newUser });
  } catch (error) {
    // 회원가입 실패시 에러를 보냄.
    res.status(500).json({ error: "회원가입 오류가 발생했습니다." });
  }
});

// 로그인 API
userRouter.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  try {
    // 사용자 정보 탐색
    const user = await UserService.login(email, password);

    // 로그인 성공시
    res.status(200).json({ token: token });
  } catch (error) {
    // 로그인 실패시 에러를 보냄.
    res.status(500).json({ error: "로그인 오류가 발생했습니다." });
  }
});

export default userRouter;

// CRUD DB 회원가입 로그인 탈퇴 CUD +
