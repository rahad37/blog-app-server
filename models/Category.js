const { Schema, model } = require('mongoose');

const categorySchema = new Schema({
   name: {
       type: String,
       required: true
   }
}, {timestamps: true})

module.exports.Category = model('Category', categorySchema);