const express = require('express');
const userService = require('../services/user-service');

const userRouter = express.Router();

// 회원가입 API
userRouter.post('/create', async (req, res, next) => {
  try {
    const { name, email, password, phoneNumber } = req.body;

    // 각 데이터를 유저 DB에 추가하기
    const newUser = await userService.create(
      name,
      email,
      password,
      phoneNumber
    );

    // 회원가입 성공시 DB에 저장한 데이터를 프론트로 보냄,
    res.status(200).json({ newUser });
  } catch (error) {
    // 회원가입 실패시 에러를 보냄.
    res.status(500).json({ error: '회원가입 오류가 발생했습니다.' });
    next(error);
  }
});

module.exports = userRouter;
