var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Product = new Schema({
    product_type_id: { type: String, require: true },
    product_title: { type: String, require: false },
    product_model_no: { type: String, require: true },
    product_cost: { type: String, require: true },
    product_height: { type: String, require: true },
    product_description: { type: String, require: true },
    product_width: { type: String, require: true },
    product_gender: { type: String, require: true },
    product_dob: { type: String, require: true },
    product_company_id: { type: String, require: true },
    product_weight: { type: String, require: true },
    product_image: { type: String, require: true },
    modified: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', Product);