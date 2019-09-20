var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Company = new Schema({
    company_name: { type: String, require: true },
}, { collection: 'company' });

module.exports = mongoose.model('company', Company);