import { useState } from 'react';
import { useForm } from 'react-hook-form'

import '../input.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import TextButton from './TextButton';

interface Props {
	placeholderInput: string;
    name: string;
    register: any,
	type?: string;
    maxLength?: number;
    minLength?: number;
    pattern?: string;
    isHasRequestButton?: boolean;
    styles?: string;
    // handleChange: (name: string, value: string) => void; 
}

export default function InputField({ 
    placeholderInput, type = 'text',
    name,
    register,
    maxLength, 
    minLength,
    pattern, 
    isHasRequestButton, 
    styles,
}: Props) {
    const { resetField, watch } = useForm({
        mode: 'onChange',
    });

    const [isActive, setIsActive] = useState(false);
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [isHasError, setIsHasError] = useState(false)

    function showPassword() {
        setIsShowPassword(prev => !prev);
    }
    
    const inputType = type === 'password' && isShowPassword ? 'text' : type

	return (
        <div className='relative'>
            <div className={`field flex relative h-13 text-left pl-3 border rounded-xl bg-[#FAFAFC] ${styles} ${isHasError ? 'border-red-600' : ''}`}>
                <label className={`field-label ${watch(name) || isActive ? '-translate-y-3 scale-[0.7] text-[#4A88FC]' : ''} ${isActive && isHasError ? 'text-red-600' : ''}`}>{placeholderInput}</label>
                <input className="field-input relative z-10 w-full h-12 pt-3 bg-transparent focus:outline-none"
                    type={inputType} 
                    {...register (name, {
                        required: `Необходимо заполнить поле: ${placeholderInput}`,
                        minLength: minLength,
                        maxLength: maxLength,
                    })}
                    minLength={minLength}
                    placeholder=''
                    pattern={pattern}
                    onFocus={() => setIsActive(true)}
                    onBlur={() => {
                        setIsHasError(watch(name) ? false : true)
                        setIsActive(false)
                    }}/>
                { watch(name) && 
                <div className='flex' 
                    onClick={() => resetField(name)}>
                    <FontAwesomeIcon className='my-auto mx-2 h-4 w-4 text-[#B9B6CC] hover:text-gray-500' icon={faCircleXmark} />
                </div> }
                { type === 'password' && 
                <button type='button' className='p-0 pr-2 border-none text-[#B9B6CC] hover:text-zinc-500 focus:outline-none' onClick={() => showPassword()}>
                    { isShowPassword ? <FontAwesomeIcon className='my-auto mx-2 h-4 w-4' icon={faEye}/> : <FontAwesomeIcon className='my-auto mx-2 h-4 w-4' icon={faEyeSlash}/> }
                </button> }
                { isHasRequestButton && 
                <div className='flex items-center pr-6'>
                    <hr className='h-4 w-[1px] mx-2 bg-[#e7e8ee]'/>
                    <TextButton text='Отправить' onPress={() => null} />
                </div> }
            </div>
            { isHasError && <p className={'text-left text-red-600'}>Необходимо заполнить поле: {placeholderInput}</p> }
        </div>
	);
}