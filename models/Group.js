// https://mongoosejs.com/docs/guide.html#definition

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GroupSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
	},
	admin: {
    type: Schema.ObjectId,
     ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
	},
  members: {
		type: [{
			type: Schema.ObjectId,
			ref: 'User'
		}]
  }
})

module.exports = mongoose.model('Group', GroupSchema)
