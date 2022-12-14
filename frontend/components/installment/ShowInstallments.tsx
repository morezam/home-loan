import { PAY_INSTALLMENT, WIN_DATE } from '../../query/mutations/installment';
import { AllInstallment } from '../../types/installments';
import MutationComponent from '../MutationComponent';
import { Table, TableData } from '../Table';

const ShowInstallments = ({
	installmentData,
}: {
	installmentData: AllInstallment;
}) => {
	return (
		<div>
			{installmentData.installment.length !== 0
				? installmentData.installment.map((loanInstallment, index) => {
						return (
							<div key={installmentData.installment[index].loan}>
								<p>{loanInstallment.name}</p>
								{!loanInstallment.wonAt ? (
									<MutationComponent
										query={WIN_DATE}
										variables={{
											loanId: loanInstallment.loan,
											borrowerId: loanInstallment.borrower,
										}}
										refetch="installment">
										امروز برنده شد
									</MutationComponent>
								) : null}
								{loanInstallment.wonAt ? (
									<p>
										این کاربر در تاریخ {loanInstallment.wonAt} این وام را برنده
										شد است.
									</p>
								) : null}
								<Table>
									<thead>
										<tr>
											<TableData>ردیف</TableData>
											<TableData>تاریخ</TableData>
											<TableData>وضعیت پرداخت</TableData>
											<TableData>میزان قسط</TableData>
											<TableData>پرداخت/تاریخ پرداخت</TableData>
										</tr>
									</thead>
									<tbody>
										{loanInstallment.installments.map((installment, i) => {
											return (
												<tr key={installment.date}>
													<TableData>{i + 1}</TableData>
													<TableData> {installment.date} </TableData>
													<TableData noWrap={true}>
														{' '}
														{installment.paid
															? 'پرداخت شده'
															: 'پرداخت نشده'}{' '}
													</TableData>
													<TableData> {installment.price} </TableData>
													<TableData>
														{!installment.paid ? (
															<MutationComponent
																query={PAY_INSTALLMENT}
																variables={{
																	loanId: loanInstallment.loan,
																	borrowerId: loanInstallment.borrower,
																	date: installment.date,
																}}
																refetch="installment">
																پرداخت
															</MutationComponent>
														) : installment.paidDate ? (
															<span>
																<p>پرداخت شده در :</p>
																{installment.paidDate}
															</span>
														) : null}
													</TableData>
												</tr>
											);
										})}
									</tbody>
								</Table>
							</div>
						);
				  })
				: null}
		</div>
	);
};

export default ShowInstallments;
