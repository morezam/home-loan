import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
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

export const userModel =
	mongoose.models.user || mongoose.model('user', userSchema);
