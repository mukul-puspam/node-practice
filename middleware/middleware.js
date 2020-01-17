var bodyParser = require("body-parser");
var morgan = require("morgan");

module.exports = function(app){
    app.use(morgan('dev'));
    // app.use(express.static('client'));
    app.use(bodyParser.urlencoded({extended:true}));
    app.use(bodyParser.json());
}