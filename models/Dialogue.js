const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DialogueSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  langPair: {
    type: String,
    required: true
  },
  decription: {
    type: String,
    required: true
  },
  parts: [
    {
      sentence: {
        type: String,
        required: true
      },
      translation: {
        type: String,
        required: true
      },
      audio: {
        type: String,
        required: true
      },
      prompt: {
        type: String,
        required: true
      },
      speaker:{
        type:String,
        required:true
      },
      helpers: [
        {
          L1: {
            type: String
          },
          L2: {
            type: String
          }
        }
      ],
      note: {
        type: String
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Dialogue = mongoose.model("dialogue", DialogueSchema);
