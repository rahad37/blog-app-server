const { Schema, model } = require('mongoose');

const postSchema = new Schema({
   title: {
       type: String,
       required: String,
       unique: true
   },
   desc: {
       type: String,
       required: false
   },
   photo: {
       type: String,
       required: false
   },
   username:{
       type: String,
       required: true
   },
   categories:{
       type: Array,
       required: false
   }
}, {timestamps: true})

module.exports.Post = model('Post', postSchema);