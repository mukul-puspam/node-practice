var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/test');
var schema = mongoose.Schema;
var postSchema = new schema({
    title:{
        type: String,
        required: true,
        unique: true
    },
    text:{
        author: String
    },
    author:{
        type: schema.Types.ObjectId,
        ref: 'users'
    },
    categories:[{
        type: schema.Types.ObjectId,
        ref: 'categories'
    }]

});

module.exports = mongoose.model('posts',postSchema);