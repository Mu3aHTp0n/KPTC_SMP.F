import { ChangeEvent, FormEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useUserStore } from '@app/store/user';
import InputField from '@shared/ui/InputField/ui/InputField.tsx';
import { registration } from '@entities/user/api/registration';
import InputCode from '@shared/ui/InputCode/ui/InputCode';
import { auth } from '@entities/user/api/auth';

interface IForm {
	username: string;
	email: string;
	code: string;
	password: string;
	confirmPassword: string;
}

interface IErrorMessage {
	username?: string;
	email?: string;
	code?: string;
	password?: string;
	confirmPassword?: string;
}

export default function RegistrationModal() {
	const {
		register,
		formState: { errors },
	} = useForm<IForm>();
	const setEmail = useUserStore(state => state.setEmail);

	const [regForm, setRegForm] = useState({
		username: '',
		email: '',
		code: '',
		password: '',
		confirmPassword: '',
	});

	const [errorMessage, setErrorMessage] = useState<IErrorMessage>({});

	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		setRegForm({ ...regForm, [event.target.name]: event.target.value });
		if (event.target.name === 'email') {
			setEmail(event.target.value);
		}
	};

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		try {
			event.preventDefault();
			await registration(regForm);
			const response = await auth({
				username: regForm.username,
				password: regForm.password,
			});
			localStorage.setItem(
				'refreshToken',
				response.data.jwtTokenPairDto.refreshToken,
			);
			localStorage.setItem(
				'accessToken',
				response.data.jwtTokenPairDto.accessToken,
			);
			location.reload();
		} catch (error) {
			console.log(error);
			setErrorMessage(error);
		}
	};

	return (
		<form onSubmit={event => handleSubmit(event)}>
			<InputField
				register={register}
				name='username'
				placeholder='Ник в майнкрафте'
				pattern={'^[a-zA-Z0-9_]+$'}
				required={true}
				maxLength={16}
				value={regForm.username}
				onChange={handleInputChange}
			/>
			{errorMessage.username && (
				<p className={'text-red-700'}>{errorMessage.username}</p>
			)}
			<InputField
				register={register}
				pattern={
					'^[a-zA-Z0-9!@#$%^&*()_+\\\\-=\\\\[\\\\]{};\':\\"\\\\\\\\|,.<>\\\\/?]+$'
				}
				name='email'
				placeholder='Электронная почта'
				required={true}
				value={regForm.email}
				maxLength={30}
				styles='mt-4'
				onChange={handleInputChange}
			/>
			{errorMessage.email && (
				<p className={'text-red-700'}>{errorMessage.email}</p>
			)}
			<InputCode
				register={register}
				name='code'
				placeholder='Код'
				required={true}
				maxLength={6}
				value={regForm.code}
				onChange={handleInputChange}
				styles='mt-4'
			/>
			{errorMessage.code && (
				<p className={'text-red-700'}>{errorMessage.code}</p>
			)}
			<InputField
				register={register}
				name='password'
				placeholder='Пароль'
				required={true}
				type='password'
				minLength={8}
				maxLength={30}
				value={regForm.password}
				onChange={handleInputChange}
				styles='mt-4'
			/>
			{errorMessage.password && (
				<p className={'text-red-700'}>{errorMessage.password}</p>
			)}
			<InputField
				register={register}
				name='confirmPassword'
				placeholder='Подтверждение пароля'
				required={true}
				type='password'
				minLength={8}
				maxLength={30}
				value={regForm.confirmPassword}
				onChange={handleInputChange}
				styles='mt-4'
			/>
			{errorMessage.confirmPassword && (
				<p className={'text-red-700'}>{errorMessage.confirmPassword}</p>
			)}
			<button
				className='border-none text-white bg-blue-600 mt-3 w-full'
				type='submit'
			>
				Зарегистрироваться
			</button>
		</form>
	);
}
