interface Installments {
	date: string;
	price: string;
	paid?: boolean;
	paidDate?: string;
}

export interface LoanInstallments {
	loan: string;
	borrower: string;
	name: string;
	numberOfInstalments?: number;
	wonAt?: string;
	installments: Installments[];
}

export interface AllInstallment {
	installment: LoanInstallments[];
}

export interface CreateInstallmentData {
	date: string;
	name: string;
	numberOfInstalments: number;
	price: string;
	loan: string;
	borrower: string;
	paid?: boolean;
	paidDate?: string;
}
