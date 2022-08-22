export interface Borrower {
	firstName: string;
	lastName: string;
	id: string;
	nationalCode: string;
	phoneNumber: string;
	fatherName: string;
	userId?: string;
}

export interface Borrowers {
	borrower: Borrower;
}

export interface AllBorrowers {
	allBorrowers: Borrower[];
}
