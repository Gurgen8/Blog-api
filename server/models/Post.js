import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({

    title: {
        type: String,
        unique: true,
        required: true

    },
    desc: {
        type: String,
        required: true,

    },
    photo: {
        type: String,
        required: false,

    },
    userName: {
        type: String,
        required: true
    },
    categories: {
        type: Array,
        required: false
    }

}, { timestamps: true })


export default mongoose.model("Post", PostSchema)