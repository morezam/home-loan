import { useMutation } from '@tanstack/react-query';
import type { NextPage } from 'next';
import Head from 'next/head';

import React, { useState } from 'react';

const WelcomeBack: NextPage = () => {
	const mutation = useMutation(newUser => {
		return fetch({
			method: 'POST',
			body: JSON.stringify({
				firstName,
				lastName,
				nationalCode,
				phoneNumber,
				fatherName,
			}),
		});
	});
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [nationalCode, setNationalCode] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [fatherName, setFatherName] = useState('');

	const onButtonSubmit = () => {};
	return (
		<div>
			<Head>
				<title>صندوق قرض الحسنه خانگی ونداده</title>
			</Head>
			<form>
				<input value={firstName} onChange={e => setFirstName(e.target.value)} />
				<input value={lastName} onChange={e => setLastName(e.target.value)} />
				<input
					value={nationalCode}
					onChange={e => setNationalCode(e.target.value)}
				/>
				<input
					value={phoneNumber}
					onChange={e => setPhoneNumber(e.target.value)}
				/>
				<input
					value={fatherName}
					onChange={e => setFatherName(e.target.value)}
				/>
				<button onSubmit={onButtonSubmit}>submit</button>
			</form>
		</div>
	);
};

export default WelcomeBack;
