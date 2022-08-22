const mongoose = require('mongoose');

const borrowerModel = mongoose.Schema({
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
			ref: 'installment',
		},
	],
	fatherName: {
		type: String,
		required: true,
	},
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user',
	},
});

const borrower = mongoose.model('borrower', borrowerModel);

module.exports = borrower;
