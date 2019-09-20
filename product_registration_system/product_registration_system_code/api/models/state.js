var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var State = new Schema({
    state_name: { type: String, require: true },
}, { collection: 'state' });

module.exports = mongoose.model('state', State);