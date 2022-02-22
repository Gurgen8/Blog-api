import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({

    userName: {
        type: String,
        unique: true,
        required: true

    },
    email: {
        type: String,
        required: true,
        unique: true

    },
    password: {
        type: String,
        required: true,
        min:6

    },
    profilepicture: {
        type: String,
        default: '',
    }

}, { timestamps: true });


export default mongoose.model("User", UserSchema)