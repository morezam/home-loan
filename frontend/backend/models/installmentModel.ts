import mongoose from 'mongoose';

const installmentSchema = new mongoose.Schema({
	wonAt: {
		type: String,
	},
	name: {
		type: String,
		required: true,
	},
	loan: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'loan',
	},
	borrower: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'borrower',
	},
	installments: [mongoose.Schema.Types.Mixed],
});

export const installmentModel =
	mongoose.models.installment ||
	mongoose.model('installment', installmentSchema);
