const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const checkEmail = require('../lib/checkEmail');
const checkPassword = require('../lib/checkPassword');

module.exports = {
	Query: {
		user: async (parent, { id }, { models: { userModel } }, info) => {
			const user = await userModel.findById({ id }).exec();
			return user;
		},
	},
	Mutation: {
		createUser: async (
			parent,
			{ email, password },
			{ models: { userModel } },
			info
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
			parent,
			{ email, password },
			{ models: { userModel } },
			info
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
