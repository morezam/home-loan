const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
	Query: {
		user: async (parent, { id }, { models: { userModel } }, info) => {
			const user = await userModel.findById({ id }).exec();
			return user;
		},
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

		login: async (
			parent,
			{ email, password },
			{ models: { userModel } },
			info
		) => {
			const user = await userModel.findOne({ email }).exec();
			if (!user) {
				throw new Error('user not found');
			}
			const matchPasswords = bcrypt.compareSync(password, user.password);

			if (!matchPasswords) {
				throw new Error('password is not correct');
			}

			const token = jwt.sign({ id: user.id }, 'riddlemethis', {
				expiresIn: 24 * 10 * 50,
			});

			return {
				token,
				user,
			};
		},
	},

	Mutation: {
		createUser: async (
			parent,
			{ email, password },
			{ models: { userModel } },
			info
		) => {
			const hashedPassword = bcrypt.hashSync(password, 12);
			const user = await userModel.create({ email, password: hashedPassword });
			const token = jwt.sign({ id: user.id }, 'riddlemethis', {
				expiresIn: '24h',
			});

			return {
				token,
				user,
			};
		},
		createBorrower: async (
			parent,
			{ ...args },
			{ models: { borrowerModel }, authenticatedUser },
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
			{ id },
			{ models: { borrowerModel } },
			info
		) => {
			const deletedBorrower = await borrowerModel.findByIdAndDelete(id);
			return deletedBorrower;
		},

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
