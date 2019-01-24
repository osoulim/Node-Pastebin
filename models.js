let mongoose = require('mongoose');

let pasteSchema = mongoose.Schema({
    content: {type: String, require: true},
    language: {type: String, default : 'plain'}
});

module.exports = mongoose.model('Paste', pasteSchema);