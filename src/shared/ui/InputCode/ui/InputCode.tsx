import { ChangeEvent, InputHTMLAttributes, useState } from 'react';
import { UseFormRegister, FieldValues } from 'react-hook-form';
import { useUserStore } from '@app/store/user';
import { $api } from '@app/api';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { TextButton } from '@shared/ui/TextButton';

import style from './InputCode.module.scss';
import cn from 'classnames';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
	placeholder: string;
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
	register: UseFormRegister<FieldValues>;
	styles?: string;
}

interface IErrorMessage {
	email?: string;
	message?: string;
}

export default function InputCode({
	value,
	placeholder,
	onChange,
	type = 'text',
	name,
	register,
	pattern,
	required = false,
	styles,
}: Props) {
	const [isActive, setIsActive] = useState(false);
	const [isHasError, setIsHasError] = useState(false);
	const [errorMessage, setErrorMessage] = useState<IErrorMessage>({});
	const [isSent, setIsSent] = useState(false);
	const [timer, setTimer] = useState(0);

	const email = useUserStore(state => state.email);

	const sendCode = async (email: string) => {
		if (email) {
			try {
				setIsSent(true);
				setTimer(30);
				const interval = setInterval(() => setTimer(prev => prev - 1), 1000);
				setTimeout(() => {
					setIsSent(false);
					clearInterval(interval);
				}, 30000);
				await $api.post('/email/confirmation-code', {
					email: email,
				});
			} catch (error) {
				setErrorMessage(error);
			}
		} else {
			setErrorMessage({
				message: 'Пожалуйста заполните поле электронной почты',
			});
		}
	};

	return (
		<div className='relative'>
			<div
				className={cn(style.field, styles, 'h-13 border', {
					'border-red-600': isHasError,
				})}
			>
				<label
					className={cn(style.fieldLabel, {
						'-translate-y-3 scale-[0.7] text-[#4A88FC]': value || isActive,
						'text-red-600': isActive && isHasError,
					})}
				>
					{placeholder}
				</label>
				<input
					value={value}
					className='field-input relative z-10 w-full h-12 pt-3 bg-transparent focus:outline-none'
					type={type}
					{...register(name!, {
						required: `Необходимо заполнить поле: ${placeholder}`,
					})}
					placeholder=''
					required={required}
					pattern={pattern}
					minLength={6}
					maxLength={6}
					onChange={event => {
						onChange(event);
					}}
					onFocus={() => setIsActive(true)}
					onBlur={() => {
						setIsHasError(!value);
						setIsActive(false);
					}}
				/>
				{value && (
					<div className='flex'>
						<FontAwesomeIcon
							className='my-auto mx-2 h-4 w-4 text-[#B9B6CC] hover:text-gray-500'
							icon={faCircleXmark}
						/>
					</div>
				)}
				<div className='flex items-center pr-6'>
					<hr className='h-4 w-[1px] mx-2 bg-[#e7e8ee]' />
					<TextButton
						text='Отправить'
						disabled={!!timer}
						onPress={() => sendCode(email)}
					/>
					{isSent && <span className={'ml-2'}>{timer}</span>}
				</div>
			</div>
			{isHasError && (
				<p className={'text-left text-red-600'}>
					Необходимо заполнить поле: {placeholder}
				</p>
			)}
			{errorMessage.email && (
				<p className={'text-red-700'}>{errorMessage.email}</p>
			)}
			{errorMessage.message && (
				<p className={'text-red-700'}>{errorMessage.message}</p>
			)}
		</div>
	);
}
