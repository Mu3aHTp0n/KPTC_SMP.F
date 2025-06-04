import { ChangeEvent, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { auth } from '@entities/user/api/auth'

import InputField from '@shared/ui/InputField/ui/InputField.tsx';

interface IForm {
	username: string;
	password: string;
}

interface IProps {
	setModalType: (type: string) => void;
}

interface IError {
	message?: string;
	password?: string;
}

export const AuthModal = ({ setModalType }: IProps)=> {
	const {
		register,
	} = useForm();

	const [formData, setFormData] = useState({
		username: '',
		password: '',
	});

	const [errorMessage, setErrorMessage] = useState<IError>({});

	const onSubmit: SubmitHandler<IForm> = async data => {
		try {
			const response = await auth(data);
			localStorage.setItem(
				'accessToken',
				response.data.tokens.accessToken,
			);
			localStorage.setItem(
				'refreshToken',
				response.data.tokens.refreshToken,
			);
			setErrorMessage({});
			location.reload();
		} catch (error) {
			setErrorMessage(error);
		}
	};

	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [event.target.name]: event.target.value });
	};

	const changeModal = (type: string) => {
		setModalType(type)
	}

	return (
		<form
			onSubmit={event => {
				event.preventDefault();
				onSubmit(formData);
			}}
		>
			<InputField
				register={register}
				pattern={'^[a-zA-Z0-9_]+$'}
				value={formData.username}
				onChange={handleInputChange}
				placeholder='Ник'
				required={true}
				name={'username'}
				minLength={3}
				maxLength={16}
			/>
			<InputField
				register={register}
				value={formData.password}
				onChange={handleInputChange}
				placeholder='Пароль'
				pattern={
					'^[a-zA-Z0-9!@#$%^&*()_+\\\\-=\\\\[\\\\]{};\':\\"\\\\\\\\|,.<>\\\\/?]+$'
				}
				required={true}
				name={'password'}
				type='password'
				minLength={8}
				maxLength={30}
				styles='mt-4'
			/>
			{errorMessage.password && <p className={'text-red-700'}>{errorMessage.password}</p>}
			<div className={'flex items-center justify-between text-left my-3'}>
				<p
					onClick={() => changeModal('passwordReset')}
					className='text-blue-600 cursor-pointer m-2'
				>
					Забыли пароль?
				</p>
				<p className={'text-blue-600 cursor-pointer'} onClick={() => changeModal('registration')}>Регистрация</p>
			</div>
			{errorMessage.message && <p className={'text-red-700'}>{errorMessage.message}</p>}
			<button className='border-none px-6 py-3 text-white bg-blue-600 mt-4' type='submit'>
				Войти
			</button>
		</form>
	);
}
