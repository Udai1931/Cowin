const mongoose = require('mongoose')
// const { ObjectId } = mongoose.Schema.Types

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    results:{
        type: String,
    }
});

mongoose.model('User',userSchema)