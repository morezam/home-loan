import mongoose from 'mongoose';

const loanSchema = new mongoose.Schema({
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
	borrowers: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'borrower',
		},
	],
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user',
	},
	numberOfPeople: {
		type: Number,
		required: true,
	},
});

export const loanModel =
	mongoose.models.loan || mongoose.model('loan', loanSchema);
