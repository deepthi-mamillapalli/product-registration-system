var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Month = new Schema({
    month_name: { type: String, require: true },
}, { collection: 'month' });

module.exports = mongoose.model('month', Month);