import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { createAvatar } from '@dicebear/core';
import { avataaars } from '@dicebear/collection';
import generateTokenAndSetCookie from "../utils/generateToken.js";

// Controller for user signup
export const signup = async (req, res) => {
    try {
        const {fullName, username, password, confirmPassword, gender} = req.body;

        // Check if passwords match
        if (password !== confirmPassword) {
            return res.status(400).json({error:"Passwords don't match!"});
        }
        
        // Check if username already exists
        const user = await User.findOne({username});
        if(user) {
            return res.status(400).json({error:"Username already exists!"});
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Define hairstyles based on gender
        const maleHairs = ["bun","curly","dreads","dreads01","dreads02","frizzle","fro","hat","longButNotTooLong","shaggy","shaggyMullet","shavedSides","shortCurly","shortFlat","shortRound","shortWaved","sides","theCaesar","theCaesarAndSidePart","turban","winterHat1","winterHat02","winterHat03","winterHat04"];
        const femaleHairs = ["bigHair","bob","bun","curly","curvy","frida","froBand","hat","hijab","longButNotTooLong","miaWallace","shavedSides","straight01","straight02","straightAndStrand","winterHat1","winterHat02","winterHat03","winterHat04"];
        const allHairs = ["bigHair","bob","bun","curly","curvy","dreads","dreads01","dreads02","frida","frizzle","fro","froBand","hat","hijab","longButNotTooLong","miaWallace","shaggy","shaggyMullet","shavedSides","shortCurly","shortFlat","shortRound","shortWaved","sides","straight01","straight02","straightAndStrand","theCaesar","theCaesarAndSidePart","turban","winterHat1","winterHat02","winterHat03","winterHat04"];

        let hair = allHairs;
        if (gender === "male") {
            hair = maleHairs;
        } else if (gender === "female") {
            hair = femaleHairs;
        }

        // Generate avatar based on username and gender
        const avatar = createAvatar(avataaars, {
            seed: username,
            backgroundType: ["solid"],
            backgroundColor: ["b6e3f4","c0aede","d1d4f9","ffd5dc","ffdfbf"],
            facialHairProbability: gender === "male" ? 30 : 0,
            top: hair
          });

        const profilePic = avatar.toDataUri();

        // Create new user object
        const newUser = new User({
            fullName,
            username,
            password: hashedPassword,
            gender,
            profilePic
        })

        // Save user and generate token
        if (newUser) {
            generateTokenAndSetCookie(newUser._id, res);
            await newUser.save();

            // Respond with user data
            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                profilePic: newUser.profilePic
            });
        } else {
            res.status(400).json({error: "Invalid user data"});
        }

    } catch (error) {
        console.log("Error in signup controller:", error.message);
        res.status(500).json({error: "Internal server error"});
    }
}

// Controller for user login
export const login = async (req, res) => {
    try {
        const {username, password} = req.body;

        // Find user by username
        const user = await User.findOne({username});

        // Compare entered password with stored password
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

        // Check if user exists and password is correct
        if (!user || !isPasswordCorrect) {
            return res.status(400).json({error: "Invalid credentials"});
        }

        // Generate token and set cookie
        generateTokenAndSetCookie(user._id, res);

        // Respond with user data
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            profilePic: user.profilePic
        });

    } catch (error) {
        console.log("Error in login controller:", error.message);
        res.status(500).json({error: "Internal server error"});
    }
}

// Controller for user logout
export const logout = (req, res) => {
    try {
        // Clear JWT cookie
        res.cookie("jwt", "", {maxAge: 0});
        res.status(200).json({message: "Logged out successfully!"})
    } catch (error) {
        console.log("Error in logout controller:", error.message);
        res.status(500).json({error: "Internal server error"});
    }
}