// TODO : Add a borrowers type
export interface Loan {
	id: string;
	name: string;
	price: string;
	startingDate: string;
	numberOfInstalments: number;
	description: string;
	numberOfPeople: number;
}

export interface Loans {
	loan: Loan;
}

export interface AllLoan {
	allLoan: Loan[];
}
