import { Schema } from "mongoose";

const userSchema = new Schema(
  { 
    name: {
      type: String,
      required: true,
    },
    
    email: {
      type: String,
      required: true,
      unique: true,
    },
    
    password: {
      type: String,
      required: true,
    },
    
    phoneNumber: {
      type: String,
      required: false,
    },

    address: {
      type: new Schema(
        {
          postalCode: String,
          address1: String,
          address2: String,
        },
        {
          _id: false,
        }
      ),
      required: false,
    },

    role: {
      type: String,
      required: false,
      default: "1",
    },

    createdAt: {
      type: Date,
      default: Date.now
    }
  }
  
);

export { userSchema };
