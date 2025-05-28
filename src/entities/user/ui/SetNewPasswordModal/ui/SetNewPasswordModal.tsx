import { ChangeEvent, FormEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';

import InputField from '@shared/ui/InputField/ui/InputField';

import { resetPassword } from '@entities/user/api/resetPassword';

interface IError {
	message?: string;
	password?: string;
	confirmPassword?: string;
}

export const SetNewPasswordModal = () => {
	const { register } = useForm();
	const [searchParams] = useSearchParams();

	const uuid = searchParams.get('uuid')!;
	const navigate = useNavigate();

	const [passwordData, setPasswordData] = useState({
		password: '',
		confirmPassword: '',
	});
	const [errorMessage, setErrorMessage] = useState<IError>({});

	const handleSubmitNewPassword = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			await resetPassword(passwordData, uuid);
			setErrorMessage({})
			navigate('/')
		} catch (error) {
			setErrorMessage(error.message);
		}
	};

	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		setPasswordData({
			...passwordData,
			[event.target.name]: event.target.value,
		});
	};

	return (
		<form onSubmit={event => handleSubmitNewPassword(event)}>
			<InputField
				placeholder={'Пароль'}
				pattern={
					'^[a-zA-Z0-9!@#$%^&*()_+\\\\-=\\\\[\\\\]{};\':\\"\\\\\\\\|,.<>\\\\/?]+$'
				}
				onChange={handleInputChange}
				name={'password'}
				register={register}
				value={passwordData.password}
				minLength={8}
				maxLength={30}
				type='password'
			/>
			{ errorMessage.password && <p className={'text-red-600'}>{errorMessage.password}</p> }
			<InputField
				placeholder={'Подтверждение пароля'}
				pattern={
					'^[a-zA-Z0-9!@#$%^&*()_+\\\\-=\\\\[\\\\]{};\':\\"\\\\\\\\|,.<>\\\\/?]+$'
				}
				onChange={handleInputChange}
				name={'confirmPassword'}
				register={register}
				value={passwordData.confirmPassword}
				minLength={8}
				maxLength={30}
				type='password'
			/>
			{ errorMessage.confirmPassword && <p className={'text-red-600'}>{errorMessage.confirmPassword}</p> }
			{ errorMessage.message && <p className={'text-red-600'}>{errorMessage.message}</p> }
			<button
				className='border-none px-6 py-3 text-white bg-blue-600 mt-4'
				type='submit'
			>
				Войти
			</button>
		</form>
	);
};
