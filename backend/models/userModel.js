const mongoose = require('mongoose');

const userModel = mongoose.Schema({
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	loans: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'loan',
		},
	],
	borrowers: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'borrower',
		},
	],
});

const user = mongoose.model('user', userModel);

module.exports = user;
