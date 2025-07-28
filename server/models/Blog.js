const { auth } = require("firebase-admin");
const mongoose = require("mongoose");

const blogSchema = mongoose.Schema(
   {
     title:{
        type: String,
        required: true,
        trim: true
    },
    description:{
        type: String,
        required: true,
        trim: true
    },
    summary:{
        type: String,
        required: true,
    },
    imageUrl:{
        type: String,
        default: null
   },
   createdAt:{
       type: Date,
       default: Date.now
   },
   updatedAt:{
       type: Date,
       default: Date.now
   },
   author: {
       type: String,
       default: "Admin",
       required: true
   },
   read_time: {
       type: String,
       default: null        
   },
   likes: {
  type: Number,
  default: 0
},
likedBy: {
  type: [String],
  default: []
},
type:{
  type: String,
  enum: ["Bangla", "English"],
  default: "English"
},

   category: {
       type: String,
       default: null
   }},
     {
         timestamps: true
     }
 
);

module.exports = mongoose.model("Blog", blogSchema);
