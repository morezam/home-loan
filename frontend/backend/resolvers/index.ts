import { ArgsType, ModelsType } from '../../types/backendTypes';
import { Loan } from '../../types/loan';
import { generateInstallmentArray } from '../lib/generateInstallmentArray';
import { persianDateCreator } from '../lib/persianDateCreator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { checkEmail } from '../lib/checkEmail';
import { checkPassword } from '../lib/checkPassword';

interface UserInfo {
	email: string;
	password: string;
}

interface CreateInstallment extends Loan {
	loan: string;
	borrower: string;
	date: string;
}

export const resolvers = {
	Query: {
		borrower: async (
			parent: any,
			{ id }: ArgsType,
			{ models: { borrowerModel } }: ModelsType
		) => {
			const borrower = await borrowerModel.findById(id).exec();
			if (!borrower) {
				throw new Error(`No Borrower Found`);
			}
			return borrower;
		},

		allBorrowers: async (
			parent: any,
			args: any,
			{ models: { borrowerModel }, authenticatedUser }: ModelsType
		) => {
			const borrowers = await borrowerModel
				.find({ userId: authenticatedUser.id })
				.exec();
			return borrowers;
		},
		installment: async (
			parent: any,
			{ ...args },
			{ models: { installmentModel } }: ModelsType
		) => {
			const theInstallment = await installmentModel.find({ ...args }).exec();
			return theInstallment;
		},
		loan: async (
			parent: any,
			{ id }: ArgsType,
			{ models: { loanModel } }: ModelsType
		) => {
			const loan = await loanModel.findById(id).exec();
			if (!loan) {
				throw new Error(`No Loan Found`);
			}
			return loan;
		},

		allLoan: async (
			parent: any,
			args: any,
			{ models: { loanModel }, authenticatedUser }: ModelsType
		) => {
			const loans = await loanModel
				.find({ userId: authenticatedUser.id })
				.exec();
			return loans;
		},
		user: async (
			parent: any,
			{ id }: ArgsType,
			{ models: { userModel } }: ModelsType
		) => {
			const user = await userModel.findById({ id }).exec();
			return user;
		},
	},
	Mutation: {
		createBorrower: async (
			parent: any,
			{ ...args },
			{ models: { borrowerModel }, authenticatedUser }: ModelsType
		) => {
			const newBorrower = await borrowerModel.create({
				...args,
				userId: authenticatedUser.id,
			});
			return newBorrower;
		},

		updateBorrower: async (
			parent: any,
			{ id, ...args }: ArgsType,
			{ models: { borrowerModel } }: ModelsType
		) => {
			const updatedBorrower = await borrowerModel.findByIdAndUpdate(id, {
				...args,
			});
			return updatedBorrower;
		},

		deleteBorrower: async (
			parent: any,
			{ borrowerId }: ArgsType,
			{ models: { borrowerModel, installmentModel } }: ModelsType
		) => {
			await installmentModel.findOneAndDelete({
				borrower: borrowerId,
			});
			const deletedBorrower = await borrowerModel.findByIdAndDelete(borrowerId);
			return deletedBorrower;
		},
		createInstallment: async (
			parent: any,
			{
				date,
				price,
				loan,
				borrower,
				name,
				numberOfInstalments,
			}: CreateInstallment,
			{ models: { installmentModel } }: ModelsType
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
			parent: any,
			{ loanId, date, borrowerId }: ArgsType,
			{ models: { installmentModel } }: ModelsType
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
			parent: any,
			{ loanId, borrowerId }: ArgsType,
			{ models: { installmentModel } }: ModelsType
		) => {
			const wonDate = persianDateCreator(new Date());

			await installmentModel.findOneAndUpdate(
				{ loan: loanId, borrower: borrowerId },
				{ wonAt: wonDate }
			);
			return { date: '', price: '' };
		},

		deleteInstallment: async (
			parent: any,
			{ borrowerId }: ArgsType,
			{ models: { installmentModel } }: ModelsType
		) => {
			const deletdInstallmentCount = await installmentModel.deleteMany({
				borrower: borrowerId,
			});
			return deletdInstallmentCount;
		},
		createLoan: async (
			parent: any,
			{ ...args },
			{ models: { loanModel }, authenticatedUser }: ModelsType
		) => {
			const newLoan = await loanModel.create({
				...args,
				userId: authenticatedUser.id,
			});
			return newLoan;
		},

		updateLoan: async (
			parent: any,
			{ id, ...args }: ArgsType,
			{ models: { loanModel } }: ModelsType
		) => {
			const updatedLoan = await loanModel.findByIdAndUpdate(id, { ...args });
			return updatedLoan;
		},

		deleteLoan: async (
			parent: any,
			{ id }: ArgsType,
			{ models: { loanModel } }: ModelsType
		) => {
			const deletedLoan = await loanModel.findByIdAndDelete(id);
			return deletedLoan;
		},
		createUser: async (
			parent: any,
			{ email, password }: UserInfo,
			{ models: { userModel } }: ModelsType
		) => {
			const checkedPassword = checkPassword(password);
			const checkedEmail = checkEmail(email);

			if (!checkedPassword) {
				throw new Error(
					'رمز عبور شما باید شامل هشت کاراکتر و حداقل یک حرف کوچک، یک حرف بزرگ و یک حرف خاص باشد.'
				);
			}

			if (!checkedEmail) {
				throw new Error('ایمیل نامعتبر می باشد.');
			}

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

		login: async (
			parent: any,
			{ email, password }: UserInfo,
			{ models: { userModel } }: ModelsType
		) => {
			const user = await userModel.findOne({ email }).exec();
			if (!user) {
				throw new Error('کاربری با این ایمیل یافت نشد.');
			}
			const matchPasswords = bcrypt.compareSync(password, user.password);

			if (!matchPasswords) {
				throw new Error('رمز عبور وارد شده صحیح نمی باشد.');
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
};
