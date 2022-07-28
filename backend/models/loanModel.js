const mongoose = require('mongoose');

const loanModel = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	startingDate: {
		type: String,
		required: true,
	},
	numberOfInstalments: {
		type: Number,
		required: true,
	},
	description: {
		type: String,
	},
	users: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'user',
		},
	],
	numberOfPeople: {
		type: Number,
		required: true,
	},
});

const loan = mongoose.model('loan', loanModel);

module.exports = loan;
