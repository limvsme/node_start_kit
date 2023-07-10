const model = require('mongoose');
const bcrypt = require('bcrypt');
const UserSchema = require('../db/schemas/user-schema');

// const User = model('users', UserSchema);

 import jwt from "jsonwebtoken";
 import { UserModel } from "../db/models/user-model";

class UserService {
  constructor() {
    this.userModel = new UserModel();
  }

  async login(email, password) {
    const user = await this.userModel.findByEmail(email);

    if (!user) {
      throw new Error("해당 이메일은 가입되어 있지 않습니다.");
    }

    if (user.password !== password) {
      throw new Error("비밀번호가 올바르지 않습니다.");
    }

    const token = jwt.sign({ userId: user._id }, "mysecretkey", { expiresIn: "1h" });

    // 로그인이 성공하면 코인 발급 및 유저 정보 반환
    return { token, user };
  }
}

export default UserService;
