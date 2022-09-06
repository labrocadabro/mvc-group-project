// https://mongoosejs.com/docs/guide.html#definition

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const memberSchema = new Schema({
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

const GroupSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
	},
  adminId: {
    type: Schema.ObjectId,
     ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
	},
  members: {
		type: [memberSchema]
  }
})

module.exports = mongoose.model('Group', GroupSchema)
