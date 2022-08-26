import { Model } from 'mongoose';

export interface ArgsType {
	id?: string;
	borrowerId?: string;
	loanId?: string;
	date?: string;
	password: string;
}

export interface ModelsType {
	models: {
		borrowerModel: Model<ArgsType>;
		userModel: Model<ArgsType>;
		loanModel: Model<ArgsType>;
		installmentModel: Model<ArgsType>;
	};
	authenticatedUser: {
		id: string;
	};
}
