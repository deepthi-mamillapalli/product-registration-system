var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Type = new Schema({
    type_title: { type: String, require: true },
    type_description: { type: String, require: true },
}, { collection: 'type' });

module.exports = mongoose.model('type', Type);