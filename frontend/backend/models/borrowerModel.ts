import mongoose from 'mongoose';

const borrowerSchema = new mongoose.Schema({
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

export const borrowerModel =
	mongoose.models.borrower || mongoose.model('borrower', borrowerSchema);
