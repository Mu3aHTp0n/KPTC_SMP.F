import { ChangeEvent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { changeUserPassword } from '@entities/user/api';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import InputField from '@shared/ui/InputField/ui/InputField';

import cn from 'classnames';

import changePassword from '@shared/assets/changePassword.png'

interface IErrorMessage {
	message?: string;
	password?: string;
	confirmPassword?: string;
}
interface IProps {
	setShow: (value: boolean) => void;
}

function ChangePasswordModal({ setShow }: IProps) {
	const { register } = useForm();

	const [formData, setFormData] = useState({
		oldPassword: '',
		password: '',
		confirmPassword: '',
	});
	const [errorMessage, setErrorMessage] = useState<IErrorMessage>({});

	const [passCheck, setPassCheck] = useState({
		isNotEmpty:
			formData.oldPassword !== '' &&
			formData.password !== '' &&
			formData.confirmPassword,
		isLength: formData.password.length >= 8 && formData.password.length <= 30,
		isMatch:
			formData.password.length > 0 &&
			formData.confirmPassword.length > 0 &&
			formData.password === formData.confirmPassword,
	});
	const [isDisabled, setIsDisabled] = useState(true);

	useEffect(() => {
		setPassCheck({
			isNotEmpty:
				formData.oldPassword !== '' &&
				formData.password !== '' &&
				formData.confirmPassword,
			isLength: formData.password.length >= 8 && formData.password.length <= 30,
			isMatch:
				formData.password.length > 0 &&
				formData.confirmPassword.length > 0 &&
				formData.password === formData.confirmPassword,
		});
	}, [formData]);
	useEffect(() => {
		setIsDisabled(
			!(passCheck.isLength && passCheck.isMatch && passCheck.isNotEmpty),
		);
	}, [passCheck]);

	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [event.target.name]: event.target.value });
	};

	const changePasswordRequest = async () => {
		if (isDisabled) return;
		try {
			setIsDisabled(true);
			await changeUserPassword(formData);
			setErrorMessage({});
			alert('Пароль успешно изменён');
			setShow(false)
		} catch (error) {
			setErrorMessage(error);
		}
		finally {
			setIsDisabled(false);
		}
	};

	return (
		<>
			<img className="w-24 h-24 mx-auto mb-8" src={changePassword} alt={'🔒'}/>
			<p className='m-2'>Пожалуйста, установите надёжный пароль</p>
			<form onSubmit={event => event.preventDefault()}>
				<InputField
					register={register}
					value={formData.oldPassword}
					onChange={handleInputChange}
					placeholder='Текущий пароль'
					name={'oldPassword'}
					type='password'
					minLength={8}
					styles={"mb-2"}
				/>
				{errorMessage.message && (
					<p className={'text-red-700 font-bold'}>{errorMessage.message}</p>
				)}
				<InputField
					register={register}
					value={formData.password}
					onChange={handleInputChange}
					placeholder='Новый пароль'
					name={'password'}
					type='password'
					styles={"mb-2"}
				/>
				{errorMessage.password && (
					<p className={'text-red-700 text-xs font-bold'}>
						{errorMessage.password}
					</p>
				)}
				<InputField
					register={register}
					value={formData.confirmPassword}
					onChange={handleInputChange}
					placeholder='Подтверждение пароля'
					name={'confirmPassword'}
					type='password'
					styles={"mb-2"}
				/>
				{errorMessage.confirmPassword && (
					<p className={'text-red-700 text-xs font-bold'}>
						{errorMessage.confirmPassword}
					</p>
				)}
			</form>
			<ul className='text-[#6B607B] text-left my-4 pl-2'>
				<li className='mt-2'>
					<FontAwesomeIcon
						className={cn('mr-2', passCheck.isNotEmpty ? 'text-[#4A88FC]' : 'text-[#6B607B]')}
						icon={faCircleCheck}
					/>
					Все поля заполнены
				</li>
				<li className='mt-2'>
					<FontAwesomeIcon
						className={cn('mr-2', passCheck.isLength ? 'text-[#4A88FC]' : 'text-[#6B607B]')}
						icon={faCircleCheck}
					/>
					Длина пароля от 8 до 30 символов
				</li>
				<li className='mt-2'>
					<FontAwesomeIcon
						className={cn('mr-2', passCheck.isMatch ? 'text-[#4A88FC]' : 'text-[#6B607B]')}
						icon={faCircleCheck}
					/>
					Новые пароли должны совпадать
				</li>
			</ul>
			<button
				className='w-full p-3 mt-2'
				onClick={() => changePasswordRequest()}
			>
				Подтвердить
			</button>
		</>
	);
}

export default ChangePasswordModal;
