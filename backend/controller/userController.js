import { catchasyncerrors } from "../middlewares/catchasyncerror.js";
import Errorhandler from "../middlewares/error.js";
import {User} from "../models/userSchema.js";
import {v2 as cloudinary} from "cloudinary";
import { generateToken } from "../utils/jwtToken.js";

export const register = catchasyncerrors(async (req,res,next)=>{
    if(!req.files || Object.keys(req.files).length === 0){
        return next(new Errorhandler("Avatar and Resume are required",400));
    }
    const {avatar,resume} = req.files;
    const cloudinaryresponseforAvatar = await cloudinary.uploader.upload(
        avatar.tempFilePath,
        {folder: "AVATARS"}
    );
    if(!cloudinaryresponseforAvatar || cloudinaryresponseforAvatar.error){
        console.error(
            "cloudinary error:", cloudinaryresponseforAvatar.error || "Unknow cloudinary error"
        );
    };

    const cloudinaryresponseforResume = await cloudinary.uploader.upload(
        resume.tempFilePath,
        {folder: "MY_RESUME"}
    );
    if(!cloudinaryresponseforResume || cloudinaryresponseforResume.error){
        console.error(
            "cloudinary error:", cloudinaryresponseforResume.error || "Unknow cloudinary error"
        );
    };

    const {
        fullName,
        email,
        phone,
        aboutMe,
        password,
        portfolioURL,
        githubURL,
        instagramURL,
        linkedInURL,
    } = req.body;

    const user = await User.create({
        fullName,
        email,
        phone,
        aboutMe,
        password,
        portfolioURL,
        githubURL,
        instagramURL,
        linkedInURL,
        avatar:{
            public_id: cloudinaryresponseforAvatar.public_id,
            url: cloudinaryresponseforAvatar.secure_url
        },
        resume:{
            public_id: cloudinaryresponseforResume.public_id,
            url: cloudinaryresponseforResume.secure_url
        }
    }); 

    generateToken(user,"User registered",201,res);
})

export const login = catchasyncerrors(async (req,res,next)=>{
    const {email,password} = req.body;
    if(!email || !password){
        return next(new Errorhandler("Email and Password are required.",400));
    }
    const user = await User.findOne({email}).select("+password");
    if(!user){
        return next(new Errorhandler("Invalid Email or Password!",404));
    }
    const isPasswordMatched = await user.comparePassword(password);
    if(!isPasswordMatched){
        return next(new Errorhandler("Invalid Email or Password!",401));
    }
    generateToken(user,"Logged in",200,res);
})