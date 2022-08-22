const generateInstallmentArray = require('../lib/generateInstallmentArray');
const persianDateCreator = require('../lib/persianDateCreator');

module.exports = {
	Query: {
		installment: async (
			parent,
			{ ...args },
			{ models: { installmentModel } },
			info
		) => {
			const theInstallment = await installmentModel.find({ ...args }).exec();
			return theInstallment;
		},
	},
	Mutation: {
		createInstallment: async (
			parent,
			{ date, price, loan, borrower, name, numberOfInstalments },
			{ models: { installmentModel } },
			info
		) => {
			const borrowerInstallment = await installmentModel
				.find({ loan, borrower })
				.exec();
			if (borrowerInstallment.length !== 0) {
				throw new Error('این  وام گیرنده این وام را قبلا گرفته است');
			}

			const installmentsArray = await generateInstallmentArray({
				date,
				numberOfInstalments,
				price,
			});

			const newInstallment = await installmentModel.create({
				name,
				loan,
				borrower,
				installments: installmentsArray,
			});

			return newInstallment;
		},

		payInstallment: async (
			parent,
			{ loanId, date, borrowerId },
			{ models: { installmentModel } },
			info
		) => {
			const paidDate = persianDateCreator(new Date());
			await installmentModel.updateOne(
				{
					loan: loanId,
					borrower: borrowerId,
					'installments.date': date,
				},
				{
					$set: {
						'installments.$.paid': true,
						'installments.$.paidDate': paidDate,
					},
				}
			);
			return { paid: true, date, price: '' };
		},

		winDate: async (
			parent,
			{ loanId, borrowerId },
			{ models: { installmentModel } },
			info
		) => {
			const wonDate = persianDateCreator(new Date());

			const newInstallment = await installmentModel.findOneAndUpdate(
				{ loan: loanId, borrower: borrowerId },
				{ wonAt: wonDate }
			);
			return { date: '', price: '' };
		},

		deleteInstallment: async (
			parent,
			{ borrowerId },
			{ models: { installmentModel } },
			info
		) => {
			const deletdInstallmentCount = await installmentModel.deleteMany({
				borrower: borrowerId,
			});
			return deletdInstallmentCount;
		},
	},
};
