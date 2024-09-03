const mongoose = require('mongoose');

const languagesSchema = mongoose.Schema({
    ele: { type: String, required: true },
    name: { type: String, required: true },
    content: { type: String },
    icon: { type: String },
    code: { type: String },
    index: { type: Number }
});

module.exports = mongoose.model('Languages', languagesSchema);