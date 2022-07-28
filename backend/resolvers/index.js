module.exports = {
	Query: {
		user: async (parent, { id }, { userModel }, info) => {
			const user = await userModel.findById(id).exec();
			return user;
		},

		allUsers: async (parent, args, { userModel }, info) => {
			const users = await userModel.find({}).exec();
			return users;
		},

		loan: async (parent, { id }, { loanModel }, info) => {
			const loan = await loanModel.findById(id).exec();
			return loan;
		},

		allLoan: async (parent, args, { loanModel }, info) => {
			const loans = await loanModel.find({}).exec();
			return loans;
		},
	},

	Mutation: {
		createUser: async (
			parent,
			{ firstName, lastName, nationalCode, phoneNumber, loans, fatherName },
			{ userModel },
			info
		) => {
			const newUser = await userModel.create({
				firstName,
				lastName,
				nationalCode,
				phoneNumber,
				loans,
				fatherName,
			});
			return newUser;
		},

		updateUser: async (parent, { id, ...args }, { userModel }, info) => {
			const updatedUser = await userModel.findByIdAndUpdate(id, { ...args });
			return updatedUser;
		},

		deleteUser: async (parent, { id }, { userModel }, info) => {
			const deletedUser = await userModel.findByIdAndDelete(id);
			return deletedUser;
		},

		createLoan: async (parent, { ...args }, { loanModel }, info) => {
			const newLoan = await loanModel.create({ ...args });
			return newLoan;
		},

		updateUser: async (parent, { id, ...args }, { loanModel }, info) => {
			const updatedLoan = await loanModel.findByIdAndUpdate(id, { ...args });
			return updatedLoan;
		},

		deleteLoan: async (parent, { id }, { loanModel }, info) => {
			const deletedLoan = await loanModel.findByIdAndDelete(id);
			return deletedLoan;
		},
	},
};
