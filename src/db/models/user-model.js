import { model } from "mongoose";
import { UserSchema } from "../schemas/user-schema";
import jwt from "jsonwebtoken";

const User = model("users", UserSchema);

    // 회원가입 유효성 검사 규칙 설정
    const addUserRules = {  
      name: 'required|string',
      email: 'required|email|unique:users.email',
      password: 'required|min:6|max:12',
      phoneNumber: 'required|string',
    };

    // 회원가입 유효성 검사 함수
    const validateAddUser = (data) => {
      const validation = new Validator(data, addUserRules);

      if(validation.fails()) {
        const errors = validation.errors.all();
        return errors;
      }
      return null;
    };

export class UserModel {

  async login(email, password) {
    // 로그인 로직을 구현합니다.
    // 이메일과 비밀번호를 확인하고 로그인 성공 시 토큰을 발급합니다.
    const user = await User.findOne({ email });

    if (user && user.password === password) {
      // 로그인 성공
      // 토큰을 발급합니다.
      const token = jwt.sign({ userId: user._id }, "mysecretkey", { expiresIn: "1h" });

      return token;
    } else {
      // 로그인 실패
      return null;
    }
  }
  
  async findByEmail(email) {
    const user = await User.findOne({ email });
    return user;
  }

  async findById(userId) {
    const user = await User.findOne({ _id: userId });
    return user;
  }

  async create(name, email, password, phoneNumber) {
    
    const validationError = validateAddUser({ name, email, password, phoneNumber })
    if(validationError == null) {
      throw new Error('유효성 검사 실패');
    }

    const createdNewUser = await User.create(name, email, password, phoneNumber);

    return createdNewUser;
  }

  async findAll() {
    const users = await User.find({});
    return users;
  }

  async update({ userId, update }) {
    const filter = { _id: userId };
    const option = { returnOriginal: false };

    const updatedUser = await User.findOneAndUpdate(filter, update, option);
    return updatedUser;
  }

  async deleteById(userId) {
    const result = await User.deleteOne({ _id: userId });
    return result;
  }

}

export { UserModel };
