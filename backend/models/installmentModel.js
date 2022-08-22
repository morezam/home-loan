const mongoose = require('mongoose');

const installmentModel = mongoose.Schema({
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

const installment = mongoose.model('installment', installmentModel);

module.exports = installment;
