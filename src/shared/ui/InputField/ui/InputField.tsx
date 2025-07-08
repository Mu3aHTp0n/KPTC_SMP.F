import { ChangeEvent, InputHTMLAttributes, useState } from 'react';
import { UseFormRegister, FieldValues } from 'react-hook-form';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faCircleXmark,
	faEye,
	faEyeSlash,
} from '@fortawesome/free-solid-svg-icons';

import cn from 'classnames';

import style from './InputField.module.scss';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
	placeholder: string;
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
	register: UseFormRegister<FieldValues>;
	styles?: string;
}

export default function InputField({
	value,
	placeholder,
	onChange,
	type = 'text',
	name,
	register,
	pattern,
	minLength,
	maxLength,
	required = false,
	styles,
}: Props) {
	const [isActive, setIsActive] = useState(false);
	const [isShowPassword, setIsShowPassword] = useState(false);
	const [isHasError, setIsHasError] = useState(false);

	const showPassword = () => {
		setIsShowPassword(prev => !prev);
	}

	const inputType = type === 'password' && isShowPassword ? 'text' : type;

	return (
		<div className={`relative ${styles}`}>
			<div
				className={cn(style.field, 'filed h-13 pl-3 border', {
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
					type={inputType}
					{...register(name!, {
						required: `Необходимо заполнить поле: ${placeholder}`,
					})}
					placeholder=''
					required={required}
					pattern={pattern}
					minLength={minLength}
					maxLength={maxLength}
					onChange={onChange}
					onFocus={() => setIsActive(true)}
					onBlur={() => {
						setIsHasError(!value);
						setIsActive(false);
					}}
				/>
				{value && (
					<button type={'button'} className='p-0 border-none focus:outline-none flex'>
						<FontAwesomeIcon
							className='my-auto mx-2 h-4 w-4 text-[#B9B6CC] hover:text-gray-500'
							icon={faCircleXmark}
						/>
					</button>
				)}
				{type === 'password' && (
					<button
						type='button'
						className='p-0 pr-2 border-none text-[#B9B6CC] hover:text-zinc-500 focus:outline-none'
						onClick={() => showPassword()}
					>
						{isShowPassword ? (
							<FontAwesomeIcon className='my-auto mx-2 h-4 w-4' icon={faEye} />
						) : (
							<FontAwesomeIcon
								className='my-auto mx-2 h-4 w-4'
								icon={faEyeSlash}
							/>
						)}
					</button>
				)}
			</div>
			{isHasError && (
				<p className={'text-left text-red-600'}>
					Необходимо заполнить поле: {placeholder}
				</p>
			)}
		</div>
	);
}
