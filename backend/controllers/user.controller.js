import User from "../models/user.model.js";

export const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;

        const allUsersButMe = await User.find({_id: {$ne:loggedInUserId}}).select("-password");

        res.status(200).json(allUsersButMe);
    } catch (error) {
        console.log("Error in user controller:", error.message);
        res.status(500).json({error: "Internal server error"});
    }
}