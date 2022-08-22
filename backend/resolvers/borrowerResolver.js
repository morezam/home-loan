module.exports = {
	Query: {
		borrower: async (parent, { id }, { models: { borrowerModel } }, info) => {
			const borrower = await borrowerModel.findById(id).exec();
			if (!borrower) {
				throw new Error(`No Borrower Found`);
			}
			return borrower;
		},

		allBorrowers: async (
			parent,
			args,
			{ models: { borrowerModel }, authenticatedUser },
			info
		) => {
			const borrowers = await borrowerModel
				.find({ userId: authenticatedUser.id })
				.exec();
			return borrowers;
		},
	},
	Mutation: {
		createBorrower: async (
			parent,
			{ ...args },
			{
				models: { borrowerModel, loanModel, installmentModel },
				authenticatedUser,
			},
			info
		) => {
			const newBorrower = await borrowerModel.create({
				...args,
				userId: authenticatedUser.id,
			});
			return newBorrower;
		},

		updateBorrower: async (
			parent,
			{ id, ...args },
			{ models: { borrowerModel } },
			info
		) => {
			const updatedBorrower = await borrowerModel.findByIdAndUpdate(id, {
				...args,
			});
			return updatedBorrower;
		},

		deleteBorrower: async (
			parent,
			{ borrowerId },
			{ models: { borrowerModel, installmentModel } },
			info
		) => {
			await installmentModel.findOneAndDelete({
				borrower: borrowerId,
			});
			const deletedBorrower = await borrowerModel.findByIdAndDelete(borrowerId);
			return deletedBorrower;
		},
	},
};
