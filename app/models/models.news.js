var mongoose = require('mongoose');

var NewsSchema = new mongoose.Schema({
    title: {
        type: String
    },
    content: {
        type: String
    },
    createTime: {
        type: Date,
        default: Date.now
    }
})

var News = mongoose.model('News', NewsSchema);
