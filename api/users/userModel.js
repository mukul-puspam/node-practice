var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/test');
var schema = mongoose.Schema;

var userSchema = new schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    admin:{
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model('users',userSchema);