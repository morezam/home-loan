const mongoose = require('mongoose');

const userModel = mongoose.Schema({
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	nationalCode: {
		type: Number,
		required: true,
	},
	phoneNumber: {
		type: Number,
		required: true,
	},
	loans: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'loan',
		},
	],
	fatherName: {
		type: String,
		required: true,
	},
});

const user = mongoose.model('user', userModel);

module.exports = user;
