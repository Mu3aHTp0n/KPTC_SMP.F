import axios from 'axios'
import { useEffect, useState } from 'react'
import { useOverlay } from './store/overlay'

import { NavLink, Link } from 'react-router-dom'

import Overlay from './modals/Overlay'
import ProfileModal from './modals/ProfileModal'
import InputField from './profile/InputField'

export default function MainHeader() {
    const isOpen = useOverlay(state => state.isOpen)
    const setOpen = useOverlay(state => state.setOpen)
    
    const [authForm, setAuthForm] = useState({
        username: '',
        password: ''
    })
    const [currentModal, setCurrentModal] = useState(0)

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

    const handleChangeAuth = (field: string) => (value: string) => {
        setAuthForm(prev => ({
            ...prev, [field]: value
        }))
    }

    function openModal() {
        setCurrentModal(2);
        setOpen();
    }

    useEffect(() => {
        if (!isOpen) {
            setCurrentModal(0)
        }
    },[isOpen])

  return (
    <header className='flex sticky top-0 z-20 items-center justify-between bg-[#212121] border-bottom border-[#2a2a2a] px-12 py-2 h-22'>
        <Link className='flex items-center' to='/'>
            <img className='mr-2' src="https://spworlds.ru/img/logo.svg" alt="logo" />
            <p className='text-xl font-bold text-white'>kptc smp</p>
        </Link>
        <ul className='flex justify-between gap-10'>
            <li>
                <NavLink className='text-white text-xl' to='/'>Главная</NavLink>
            </li>
            <li>
                <NavLink className='text-white text-xl' to='/news'>Новости</NavLink>
            </li>
            <li>
                <NavLink className='text-white text-xl' to='/guild'>Гильдии</NavLink>
            </li>
            <li>
                <NavLink className='text-white text-xl' to='/how-to-play'>Как играть</NavLink>
            </li>
        </ul>
        <div>
            {/* <Link to={'/profile/account-overview'}>
                <img className='bg-white h-12 w-12 rounded-full' src={diamond} alt={'*'} />
                </Link> */}
            <button className='border-none text-white bg-blue-600' onClick={openModal}>Войти</button>
        </div>
        { currentModal === 2 && 
            <Overlay>
                <ProfileModal title='Авторизация'>
                    <InputField placeholderInput='Ник' 
                                maxLength={16} 
                                value={authForm.username} 
                                handleChange={handleChangeAuth('username')} 
                                styles='' />
                    <InputField placeholderInput='Пароль' 
                                type='password'
                                maxLength={30} 
                                value={authForm.password} 
                                handleChange={handleChangeAuth('password')} 
                                styles='mt-4' />
                    <button className='border-none text-white bg-blue-600 mt-4' onClick={() => auth(authForm.username, authForm.password)}>Войти</button>
                </ProfileModal>
            </Overlay> }
    </header>
  )
}
