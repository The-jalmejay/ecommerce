import mongoose, { trusted } from "mongoose";
import bcrypt from "bcrypt"; // bcrypt is a library used to securely hash passwords and verify them during authentication.

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: 8,
    maxLength: 30,
    immutable: false,
  },
  age: {
    type: Number,
    min: 18,
    max: 60,
    required: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
    immutable: true,
    match: /.+\@.+\..+/,
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  contact: {
    type: Number,
    required: true,
    match: /^[0-9]{10}$/,
  },
  role: {
    type: String,
    enum: ["admin", "user"], //enum = Enumeration -> It allows only specific values and rejects everything else.
    default: "user",
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
    maxLength: 20,
    select: false, //In Mongoose, select is used to choose which fields you want to include or exclude when fetching data from MongoDB.
    validate: {
      validator: function (v) {
        let hasUpperCase = false;
        let hasLowerCase = false;
        let number = false;
        let speicalChar = false;

        for (let i = 0; i < v.length; i++) {
          const char = v[i];
          const charCode = char.charCodeAt(0);

          if (charCode >= 65 && charCode <= 90) {
            hasUpperCase = true;
          }
          if (charCode >= 97 && charCode <= 122) {
            hasLowerCase = true;
          }
          if (charCode >= 48 && charCode <= 57) {
            number = true;
          }
          if (
            (charCode >= 33 && charCode <= 46) ||
            (charCode >= 58 && charCode <= 64)
          ) {
            speicalChar = true;
          }
        }

        return hasLowerCase && hasUpperCase && number && speicalChar;
      },
      message:
        "Password that you are trying to enter in invalid, please include lowercase uppercase specialchar( !@#$%& ) and number in it, And password should be in minlength of 8 and max 20 ",
    },
    timestamps: true,
  },
});



const User = mongoose.model('User',userSchema)

export default User;
