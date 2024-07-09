import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    fullName: {
      type: String,
      required: [true, "Name Required!"],
    },
    email: {
      type: String,
      required: [true, "Email Required!"],
    },
    phone: {
      type: String,
      required: [true, "Phone Required!"],
    },
    aboutMe: {
      type: String,
      required: [true, "About Me Section Is Required!"],
    },
    password: {
      type: String,
      required: [true, "Password Required!"],
      minLength: [8, "Password Must Contain At Least 8 Characters!"],
      select: false
    },
    avatar: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    resume: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    portfolioURL: {
      type: String,
      required: [true, "Portfolio URL Required!"],
    },
    githubURL: {
      type: String,
    },
    instagramURL: {
      type: String,
    },
    linkedInURL: {
      type: String,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  })


  // for hashing password
  userSchema.pre("save",async function(next){
      if(!this.isModified("password")){
          next();
        }
        this.password = await bcrypt.hash(this.password,10);
    });
    
    // for comparing password
    userSchema.methods.comparePassword = async function(enteredPassword){
        return await bcrypt.compare(enteredPassword,this.password);
    }
    
    // for generating json web tooken
  userSchema.methods.generateJsonWebToken = function(){
    return jwt.sign({id: this._id}, process.env.JWT_SECRET_KEY,{
        expiresIn: process.env.JWT_EXPIRES
    });
  };

  export const User = mongoose.model("User",userSchema);