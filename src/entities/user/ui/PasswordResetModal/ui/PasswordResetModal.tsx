import { ChangeEvent, FormEvent, useState } from 'react';
import { useForm } from 'react-hook-form';

import InputField from '@shared/ui/InputField/ui/InputField';
import { sendResetPasswordLink } from '@entities/user/api/sendResetPasswordLink';

export const PasswordResetModal = () => {
	const { register } = useForm();

	const [email, setEmail] = useState('');
	const [errorMessage, setErrorMessage] = useState('');

	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		setEmail(event.target.value);
	};

	const handleSubmitEmail = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			const response = await sendResetPasswordLink(email)
			setErrorMessage('')
			alert(response.data.message)
		} catch (error) {
			setErrorMessage(error.message);
		}
	}

	return (
		<form onSubmit={event => handleSubmitEmail(event)}>
			<InputField
				placeholder={'Электронная почта'}
				value={email}
				type='email'
				name={'email'}
				required={true}
				onChange={handleInputChange}
				register={register}
			/>
			{ errorMessage && <p className={'text-red-700'}>{errorMessage}</p> }
			<button className='border-none px-6 py-3 text-white bg-blue-600 mt-4' type='submit'>
				Отправить
			</button>
		</form>
	);
};
