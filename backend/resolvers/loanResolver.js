module.exports = {
	Query: {
		loan: async (parent, { id }, { models: { loanModel } }, info) => {
			const loan = await loanModel.findById(id).exec();
			if (!loan) {
				throw new Error(`No Loan Found`);
			}
			return loan;
		},

		allLoan: async (
			parent,
			args,
			{ models: { loanModel }, authenticatedUser },
			info
		) => {
			const loans = await loanModel
				.find({ userId: authenticatedUser.id })
				.exec();
			return loans;
		},
	},

	Mutation: {
		createLoan: async (
			parent,
			{ ...args },
			{ models: { loanModel }, authenticatedUser },
			info
		) => {
			const newLoan = await loanModel.create({
				...args,
				userId: authenticatedUser.id,
			});
			return newLoan;
		},

		updateLoan: async (
			parent,
			{ id, ...args },
			{ models: { loanModel } },
			info
		) => {
			const updatedLoan = await loanModel.findByIdAndUpdate(id, { ...args });
			return updatedLoan;
		},

		deleteLoan: async (parent, { id }, { models: { loanModel } }, info) => {
			const deletedLoan = await loanModel.findByIdAndDelete(id);
			return deletedLoan;
		},
	},
};
