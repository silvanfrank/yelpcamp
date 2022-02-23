const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    body: String,
    rating: Number, 
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User' //a reference call author, which is a reference to a User instance
    }
});

module.exports = mongoose.model("Review", reviewSchema);
