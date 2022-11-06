const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;


const blogModel = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    description: { type: String},
    author: {type: String, required: true},
    state: {
        type: String,
        enum: ['draft', 'published'],
        default: 'draft'
    },
    read_count: Number, 
    reading_time: Number,
    tags: [String],
    body: { type: String, required: true},
}, {
    timestamps:true,
});

// function to get reading time
function readingTime(text) {
    if (typeof text === "string") {
        const wpm = 225;
        const words = text.trim().split(/\s+/).length;
        const time = Math.ceil(words / wpm);
        return time;
    } else {
        return 0;
    }
}

blogModel.pre("save", async function (next) {
    const blog = this;
    const readTime = readingTime(this.body);

    this.reading_time = readTime;
    next();
});

const Blog = mongoose.model("Blog", blogModel);

module.exports = Blog;