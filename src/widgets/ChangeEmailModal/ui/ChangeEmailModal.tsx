import { ChangeEvent, FormEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useUserStore } from '@app/store/user';

import { sendCurrentEmailCode } from '@entities/user/api/sendCurrentEmailCode';
import { sendConfirmationCode } from '@entities/user';
import { changeUserEmail } from '@entities/user/api/changeUserEmail';

import InputField from '@shared/ui/InputField/ui/InputField';
import InputCode from '@shared/ui/InputCode/ui/InputCode';

import emailVerification from '@shared/assets/emailVerification.png'

interface Props {
	userData: {
		username: string;
		email: string;
	};
	setShow: (value: boolean) => void;
}

export const ChangeEmailModal= ({ userData, setShow }: Props) => {
	const { register } = useForm();

	const [code, setCode] = useState('');
	const [newEmailData, setNewEmailData] = useState({
		email: '',
		code: '',
		actionTicket: sessionStorage.getItem('actionTicket')!,
	});
	const [errorMessage, setErrorMessage] = useState('');
	const [isHasTicket, setIsHasTicket] = useState(
		!!sessionStorage.getItem('actionTicket'),
	);
	const [isSent, setIsSent] = useState(false);
	const [timer, setTimer] = useState(0);
	const [isPending, setIsPending] = useState(false);

	const setEmail = useUserStore(state => state.setEmail)

	const getCode = async () => {
		setIsSent(true);
		setTimer(30)
		const interval = setInterval(() => setTimer(prev => prev - 1), 1000)
		setTimeout(() => {
			setIsSent(false);
			clearInterval(interval);
		}, 30000)
		try {
			await sendCurrentEmailCode(userData.email);
			setErrorMessage('');
		} catch (error) {
			// @ts-ignore
			setErrorMessage(error.message);
		}
	};

	const handleEmailSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			const response = await sendConfirmationCode(code);
			sessionStorage.setItem('actionTicket', response.data.actionTicket);
			setTimeout(() => {
				sessionStorage.removeItem('actionTicket');
				alert('Истёк тикет смены почты, пожалуйста отправьте запрос ещё раз')
			}, 600000)
			setErrorMessage('');
			setIsHasTicket(true);
			setNewEmailData({...newEmailData, actionTicket: response.data.actionTicket})
		} catch (error) {
			setErrorMessage(error.message);
			setIsHasTicket(false);
		}
	};

	const handleNewEmailSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (isPending) return;
		try {
			setIsPending(true);
			await changeUserEmail(newEmailData)
			sessionStorage.removeItem('actionTicket');
			setShow(false)
		} catch (error) {
			console.log(error);
		}
		finally {
			setIsPending(false);
		}
	}

	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		setCode(event.target.value);
	};

	const handleNewInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		setNewEmailData({ ...newEmailData, [event.target.name]: event.target.value });
		if (event.target.name === 'email') {
			setEmail(event.target.value);
		}
	};

	return (
		<>
			<img src={emailVerification} alt={'📭'} className="w-24 h-24 mx-auto mb-8"/>
			{!isHasTicket ? (
				<>
					<p className='m-2'>
						Введите код подтверждения из эл. письма для проверки личности
					</p>
					<div className='flex items-center justify-center gap-2 mb-2'>
						<p>{userData.email}</p>
						<button type='submit' disabled={!!timer} className='btn btn-primary' onClick={getCode}>
							{isSent ?  timer  : 'Отправить'}
						</button>
					</div>
					<form onSubmit={handleEmailSubmit}>
						<InputField
							register={register}
							placeholder={'Код'}
							name={'code'}
							value={code}
							maxLength={6}
							onChange={handleInputChange}
							styles={'mb-1'}
						/>
						{errorMessage && (
							<p className={'text-red-700 font-bold'}>{errorMessage}</p>
						)}
						<button type={'submit'} className='w-full mt-3 p-3'>
							Подтвердить
						</button>
					</form>
				</>
			) : (
				<>
					<p className='mb-3'>
						Введите новую почту, нажмите кнопку для отправки кода, чтобы
						подтвердить новую почту
					</p>
					<form onSubmit={handleNewEmailSubmit}>
						<InputField
							register={register}
							placeholder={'Новая почта'}
							name={'email'}
							value={newEmailData.email}
							onChange={handleNewInputChange}
							styles={'mb-1'}
						/>
						<InputCode
							register={register}
							name='code'
							placeholder='Код'
							value={newEmailData.code}
							onChange={handleNewInputChange}
							styles='mt-4'
						/>
						<button type={'submit'} className='w-full mt-3 p-3'>
							Подтвердить
						</button>
					</form>
				</>
			)}
		</>
	);
}
