import { ChangeEvent, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { auth } from '@entities/user/api/auth'

import InputField from '@shared/ui/InputField/ui/InputField.tsx';

interface IForm {
	username: string;
	password: string;
}

export default function AuthModal() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IForm>();

	const [formData, setFormData] = useState({
		username: '',
		password: '',
	});

	const [errorMessage, setErrorMessage] = useState('');

	const onSubmit: SubmitHandler<IForm> = async data => {
		try {
			const response = await auth(data);
			localStorage.setItem(
				'accessToken',
				response.data.jwtTokenPairDto.accessToken,
			);
			localStorage.setItem(
				'refreshToken',
				response.data.jwtTokenPairDto.refreshToken,
			);
			setErrorMessage('');
			location.reload();
		} catch (error) {
			setErrorMessage(error.response.data.message);
		}
	};

	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [event.target.name]: event.target.value });
	};

	return (
		<form
			onSubmit={event => {
				event.preventDefault();
				onSubmit(formData);
			}}
		>
			<InputField
				register={register}
				value={formData.username}
				onChange={handleInputChange}
				placeholder='Ник'
				required={true}
				name={'username'}
				minLength={8}
			/>
			<InputField
				register={register}
				value={formData.password}
				onChange={handleInputChange}
				placeholder='Пароль'
				required={true}
				name={'password'}
				type='password'
				minLength={8}
				styles='mt-4'
			/>
			<div className={'text-left my-3'}>
				<p
					onClick={() => alert('Вспомнишь, напишешь)')}
					className='text-blue-600 m-2'
				>
					Забыли пароль?
				</p>
			</div>
			{errorMessage && <p className={'text-red-700'}>{errorMessage}</p>}
			<button className='border-none text-white bg-blue-600 mt-4' type='submit'>
				Войти
			</button>
		</form>
	);
}
