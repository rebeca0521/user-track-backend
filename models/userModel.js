var mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
require('dotenv').config()
var connection = process.env.MONGODB_URI
mongoose.connect(connection, { useNewUrlParser: true })
    .then(() => {return true})
    .catch((err) => {console.log(err)})
    

var UserSchema = new mongoose.Schema({
    phone: String,
    code: String,
    time: { type: Date, default: Date.now }
}, {
    versionKey: false
});

UserSchema.plugin(mongoosePaginate);
var User = mongoose.model('User', UserSchema);

module.exports = User