var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
    user_level_id: { type: String, require: true },
    user_username: { type: String, require: false },
    user_password: { type: String, require: true },
    user_name: { type: String, require: true },
    user_email: { type: String, require: true },
    user_mobile: { type: String, require: true },
    user_gender: { type: String, require: true },
    user_dob: { type: String, require: true },
    user_city: { type: String, require: true },
    user_state: { type: String, require: true },
    user_country: { type: String, require: true },
    user_address: { type: String, require: true },
    user_image: { type: String, require: true },
    modified: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', User);