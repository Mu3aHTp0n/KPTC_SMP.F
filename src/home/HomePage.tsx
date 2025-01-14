import { useEffect, useState } from 'react'
import axios from 'axios'

import { NavLink, Link } from 'react-router-dom'

import { useOverlay } from '../store/overlay'

import edikSkin from '@/shared/Эдик.png'
import danyaSkin from '@/shared/Даня.png'
import egorSkin from '@/shared/Егор.png'
import arturSkin from '@/shared/Артур.png'
import diamond from '@/shared/diamond.png'
import dockychan from '@/shared/Докчанский.png'
import ZM from '@/shared/ЗМ.png'
import leftFire from '@/shared/Жёлтое_пламя.png'
import rightFire from '@/shared/Красное_пламя.png'

import Overlay from '../modals/Overlay.tsx'
import ProfileModal from '../modals/ProfileModal.tsx'
import InputField from '../profile/InputField.tsx'
import SkinCard from './SkinCard'

export default function HomePage() {
    const setOpen = useOverlay(state => state.setOpen)
    const isOpen = useOverlay(state => state.isOpen)
    const [currentModal, setCurrentModal] = useState(0)

    const [regForm, setRegForm] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
        code: '',
    })

    function registration() {
        axios.post('', {
            username: regForm.username,
            password: regForm.password,
            confirmPassword: regForm.confirmPassword,
            email: regForm.email,
            code: regForm.code,
        })
        .then(response => {
            console.log(response);  
            auth(regForm.username, regForm.password)          
        })
        .catch(error => {
            console.log(error);            
        })
    }
    function auth(username: string, password: string) {
        axios.post('', {
            username: username,
            password: password
        })
        .then(response => {
            console.log(response);
            localStorage.setItem('accessToken', response.data.token)
        })
        .catch(error => {
            console.log(error);            
        })
    }

    const handleChangeReg = (field: string) => (value: string) => {
        setRegForm(prev => ({
            ...prev, [field]: value
        }))
    }

    function openModal() {
        setCurrentModal(1);
        setOpen();
    }
    useEffect(() => {
        if (!isOpen) {
            setCurrentModal(0)
        }
    }, [isOpen])

    return (
        <div className="bg-[#191919] min-h-[100vh] pt-8">
            { currentModal === 1 &&
                <Overlay>
                    <ProfileModal title='Регистрация'>
                        <InputField placeholderInput='Имя пользователя'
                                    maxLength={16}
                                    value={regForm.username}
                                    handleChange={handleChangeReg('username')}/>
                        <InputField placeholderInput='Электронная почта'
                                    value={regForm.email} 
                                    styles='mt-4'
                                    handleChange={handleChangeReg('email')}/>
                        <InputField placeholderInput='Код'
                                    maxLength={6}
                                    pattern='d*'
                                    value={regForm.code} 
                                    isHasRequestButton={true}
                                    styles='mt-4'
                                    handleChange={handleChangeReg('code')}/>
                        <InputField placeholderInput='Пароль' 
                                    type='password'
                                    maxLength={30} 
                                    value={regForm.password} 
                                    styles='mt-4'
                                    handleChange={handleChangeReg('password')}/>
                        <InputField placeholderInput='Подтверждение пароля' 
                                    type='password'
                                    maxLength={30} 
                                    value={regForm.confirmPassword} 
                                    styles='mt-4'
                                    handleChange={handleChangeReg('confirmPassword')}/>
                        <button className='border-none text-white bg-blue-600 mt-3 w-full' onClick={registration}>Зарегистрироваться</button>
                    </ProfileModal>
                </Overlay> }

            <div className="container max-w-[1200px] mx-auto">
                <section className='flex gap-1 rounded-2xl overflow-hidden'>
                    <SkinCard source={edikSkin} styles='drop-shadow-[-2px_30px_3px_rgba(0,0,0,0.65)]'/>
                    <SkinCard source={egorSkin} styles='drop-shadow-[6px_30px_3px_rgba(0,0,0,0.65)]'/>
                    <div className='flex flex-col gap-1'>
                        <div className='flex justify-center h-1/2 items-center bg-[#111111]'>
                            <h1 className='text-7xl text-center font-bold text-blue-600'>KPTC SMP</h1>
                        </div>
                        <div className='flex justify-center h-1/2 items-center bg-[#111111]'>
                            <button className='border-none text-white bg-blue-600' onClick={openModal}>Начать игру</button>
                        </div>
                    </div>
                    <SkinCard source={danyaSkin} styles='drop-shadow-[-2px_40px_3px_rgba(0,0,0,0.65)]'/>
                    <SkinCard source={arturSkin} styles='drop-shadow-[2px_30px_3px_rgba(0,0,0,0.65)]'/>
                </section>
                <section className="relative flex justify-between items-center mt-8 text-white bg-[#111111] rounded-2xl overflow-hidden">
                    <div className="bg-[url(../shared/Жёлтое_пламя.png)]">
                        <img className='absolute select-none left-0 h-full' draggable={false} src={leftFire} alt="" />
                        <img className='relative select-none z-10 pt-3' draggable={false} src={dockychan} alt="Dockychan" />
                    </div>
                    <div className="text-center">
                        <div className="flex justify-center uppercase mx-auto">
                            <img className='w-6 h-6' src={diamond} alt="*" />
                            <h3 >About</h3>
                            <img className='w-6 h-6' src={diamond} alt="*" />
                        </div>
                        <div className='relative z-20'>
                            <p>KPTC SMP - проект, где игрок сам выбирает свою судьбу.</p>
                            <p>Объединяйся с другими игроками, или развивайся в одиночку.</p>
                            <p>Присоединяйся к серверу уже сейчас. </p>
                        </div>
                    </div>
                    <div style={{ backgroundImage: `url(${rightFire})` }}>
                        <img className='absolute select-none right-0 h-full' draggable={false} src={rightFire} alt="" />
                        <img className='relative select-none z-10 pt-3 h-full' draggable={false} src={ZM} alt="ZigMan" />
                    </div>
                </section>
            </div>
        </div>
    )
}
