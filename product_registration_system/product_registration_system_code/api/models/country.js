var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Country = new Schema({
    country_name: { type: String, require: true },
}, { collection: 'country' });

module.exports = mongoose.model('country', Country);