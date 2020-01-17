var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/test');
var schema = mongoose.Schema;

var categorySchema = new schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
    type:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('categories',categorySchema);