var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var City = new Schema({
    city_name: { type: String, require: true },
}, { collection: 'city' });

module.exports = mongoose.model('city', City);