var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Role = new Schema({
    role_id: { type: String, require: true },
    role_title: { type: String, require: true },
    role_description: { type: String, require: true },
}, { collection: 'role' });

module.exports = mongoose.model('role', Role);