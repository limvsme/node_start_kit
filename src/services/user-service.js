import { model } from "mongoose";
import { bcrypt } from 'bcryprt';
import { UserSchema } from "../schemas/user-schema";

const User = model("users", UserSchema);

export class UserModel {
  async findByEmail(email) {
    const user = await User.findOne({ email });
    return user;
  }

  async findById(userId) {
    const user = await User.findOne({ _id: userId });
    return user;
  }

  // 회원 가입
  async create(userInfo) {
    const { name, email, password, phoneNumber } = userInfo;

    // // 이메일 중복 확인  =>  Validator 함수 사용시 사용 안함
    // const userEmail = await this.userModel.findByEmail(email);
    // if (userEmail) {
    //   throw new Error('현재 입력한 이메일은 이미 가입되어있습니다. 다른 이메일을 입력해 주세요.');
    // }

  
    // 비밀번호 해쉬화(암호화)
    const hashedPassword = await bcrypt.hash(password, 10);

    // 해쉬화된 비밀번호를 삽입함
    const newUserInfo = {
      name,
      email,
      password: hashedPassword,
      phoneNumber,

    }

    const createdNewUser = await User.create(newUserInfo);

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

const userModel = new UserModel();

export { userModel };
