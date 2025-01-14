import { useState } from 'react';
import axios from 'axios';

import '../input.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import TextButton from './TextButton';

interface Props {
	placeholderInput: string;
	type?: string;
    maxLength?: number;
    minLength?: number;
    pattern?: string;
    isHasRequestButton?: boolean;
    styles?: string;
    value: string;
    handleChange: (value: string) => void;
}

export default function InputField({ 
    placeholderInput, type = 'text', 
    maxLength, 
    minLength,
    pattern, 
    isHasRequestButton, 
    styles, 
    value, 
    handleChange 
}: Props) {
    const [isActive, setIsActive] = useState(false);
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [isHasError, setIsHasError] = useState(false)

    function showPassword() {
        setIsShowPassword(prev => !prev);
    }
    
    const inputType = type === 'password' && isShowPassword ? 'text' : type

    function getCode() {
        axios.post('', {
            email: value
        })
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log(error);
        })
    }

	return (
        <div className='relative'>
            <div className={`field flex relative h-13 text-left pl-3 border rounded-xl bg-[#FAFAFC] ${styles} ${isHasError ? 'border-red-600' : ''}`}>
                <label className={`field-label ${value || isActive ? '-translate-y-3 scale-[0.7] text-[#4A88FC]' : ''} ${isActive && isHasError ? 'text-red-600' : ''}`}>{placeholderInput}</label>
                <input className="field-input relative z-10 w-full h-12 pt-3 bg-transparent focus:outline-none"
                    type={inputType} 
                    maxLength={maxLength}
                    minLength={minLength}
                    placeholder='' 
                    value={value}
                    pattern={pattern}
                    onChange={event => handleChange(event.target.value)}
                    onFocus={() => setIsActive(true)}
                    onBlur={() => {
                        value ? setIsHasError(false) : setIsHasError(true)
                        setIsActive(false)
                    }}/>
                { value && 
                <div className='flex' 
                    onClick={() => handleChange('')}>
                    <FontAwesomeIcon className='my-auto mx-2 h-4 w-4 text-[#B9B6CC] hover:text-gray-500' icon={faCircleXmark} />
                </div> }
                { type === 'password' && 
                <button className='p-0 pr-2 border-none text-[#B9B6CC] hover:text-zinc-500 focus:outline-none' onClick={() => showPassword()}>
                    { isShowPassword ? <FontAwesomeIcon className='my-auto mx-2 h-4 w-4' icon={faEye}/> : <FontAwesomeIcon className='my-auto mx-2 h-4 w-4' icon={faEyeSlash}/> }
                </button> }
                { isHasRequestButton && 
                <div className='flex items-center pr-6'>
                    <hr className='h-4 w-[1px] mx-2 bg-[#e7e8ee]'/>
                    <TextButton text='Отправить' onPress={getCode} />
                </div> }
            </div>
            { isHasError && <p className={'text-left text-red-600'}>Необходимо заполнить поле: {placeholderInput}</p> }
        </div>
	);
}