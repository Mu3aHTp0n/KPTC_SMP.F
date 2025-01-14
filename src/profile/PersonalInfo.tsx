import { useEffect, useState } from "react";
import { useOverlay } from "../store/overlay";

import Overlay from "../modals/Overlay";
import ProfileModal from "../modals/ProfileModal";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";

import AccountInfoBlock from "./AccountInfoBlock";
import InfoBlockItem from "./InfoBlockItem";
import TextButton from "./TextButton";
import InputField from "./InputField";

interface Props {
	userData: {
		nickname: string;
		email: string;
		dateReg: string;
	};
}

export default function PersonalInfo({userData}: Props) {
    const setIsOpen = useOverlay(state => state.setOpen)
    const [emailChange, setEmailChange] = useState({
        email: '',
        code: ''
    })
    const [passChange, setPassChange] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    })
    const [passCheck, setPassCheck] = useState({
        isNotEmpty: passChange.oldPassword !== '' && passChange.newPassword !== '' && passChange.confirmPassword,
        isLength: passChange.newPassword.length >= 8 && passChange.newPassword.length <= 30,
        isMatch: ((passChange.newPassword.length > 0 && passChange.confirmPassword.length > 0) && passChange.newPassword === passChange.confirmPassword),
    })
    const [isDisabled, setIsDisabled] = useState(true)

    useEffect(() => {
        setPassCheck({
            isNotEmpty: passChange.oldPassword !== '' && passChange.newPassword !== '' && passChange.confirmPassword,
            isLength: passChange.newPassword.length >= 8 && passChange.newPassword.length <= 30,
            isMatch: ((passChange.newPassword.length > 0 && passChange.confirmPassword.length > 0) && passChange.newPassword === passChange.confirmPassword ),
        })
    }, [passChange])
    useEffect(() => {
        setIsDisabled(!(passCheck.isLength && passCheck.isMatch && passCheck.isNotEmpty))
    }, [passCheck])

    const [currentModal, setCurrentModal] = useState(1)
    function openEmailChange() {
        setCurrentModal(1);
        setIsOpen();    
    }
    function openPasswordChange() {
        setCurrentModal(2);
        setIsOpen();      
    }

    const handleChange = (field: string) => (value: string) => {
        setPassChange(prev => ({
            ...prev, [field]: value
        }))
    }

    return (
        <AccountInfoBlock title="Личные данные" style="ml-8">
            <InfoBlockItem itemTitle="Имя пользователя" 
                           subTitle={userData.nickname}/>
            <InfoBlockItem itemTitle="Электорнная почта" 
                           subTitle={userData.email} 
                           endItem={<TextButton text='Поменять элекронную почту' onPress={openEmailChange} />}/>
            <InfoBlockItem itemTitle="Пароль" 
                           endItem={<TextButton text='Сменить пароль' onPress={openPasswordChange} />}/>
            <Overlay>
                { currentModal === 1 &&
                <ProfileModal title='Верификация безопасности'>
                    <div className="w-24 h-24 mx-auto mb-8 bg-[url('https://account.hoyoverse.com/login-platform/default-light.6fd87a1d.png')] bg-cover"></div>
                    <p className="m-2">Введите код подтверждения из эл. письма для проверки личности</p>
                    <p>{userData.email}</p>
                    <InputField placeholderInput="Код подтверждения" 
                                type="number" 
                                value={emailChange.code}
                                handleChange={handleChange('code')}
                                isHasRequestButton={true} 
                                maxLength={6} 
                                styles='mt-4'/>
                    <button disabled={isDisabled} className="w-full mt-8 p-3" onClick={() => setCurrentModal(1.5)}>Подтвердить</button>
                </ProfileModal> }
                { currentModal === 1.5 && 
                <ProfileModal title="">

                </ProfileModal> }
                { currentModal === 2 && 
                <ProfileModal title='Установите новый пароль'>
                    <div className="w-24 h-24 mx-auto mb-8 bg-[url('https://account.hoyoverse.com/login-platform/default-light.bbf280c7.png')] bg-cover"></div>
                    <p className="m-2">Пожалуйста, установите надёжный пароль</p>
                    <form action="" onSubmit={event => event.preventDefault()}>
                        <InputField placeholderInput="Старый пароль" 
                                    type="password"
                                    minLength={8}
                                    key={1}
                                    value={passChange.oldPassword}
                                    handleChange={handleChange('oldPassword')}
                                    styles='mt-4'/>
                        <InputField placeholderInput="Новый пароль" 
                                    type="password" 
                                    key={2}
                                    value={passChange.newPassword}
                                    handleChange={handleChange('newPassword')}
                                    styles='mt-4'/>
                        <InputField placeholderInput="Подтверждение нового пароля" 
                                    type="password" 
                                    value={passChange.confirmPassword}
                                    handleChange={handleChange('confirmPassword')}
                                    key={3}
                                    styles='mt-4'/>
                    </form>
                    <ul className="text-[#6B607B] text-left mt-4 pl-2">
                        <li className="mt-2">
                            <FontAwesomeIcon className={`mr-2 ${passCheck.isNotEmpty ? 'text-[#4A88FC]' : 'text-[#6B607B]'}`} icon={faCircleCheck} />
                            Все поля заполнены
                        </li>
                        <li className="mt-2">
                            <FontAwesomeIcon className={`mr-2 ${passCheck.isLength ? 'text-[#4A88FC]' : 'text-[#6B607B]'}`} icon={faCircleCheck} />
                            Длина пароля от 8 до 30 символов
                        </li>
                        <li className="mt-2">
                            <FontAwesomeIcon className={`mr-2 ${passCheck.isMatch ? 'text-[#4A88FC]' : 'text-[#6B607B]'}`} icon={faCircleCheck} />
                            Новые пароли должны совпадать
                        </li>
                    </ul>
                    <button disabled={isDisabled} className="w-full mt-8 p-3">Подтвердить</button>
                </ProfileModal> }
            </Overlay>
        </AccountInfoBlock>
    );
}
