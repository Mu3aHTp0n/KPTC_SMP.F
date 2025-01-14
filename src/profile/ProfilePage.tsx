import { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { Route, Routes, NavLink } from 'react-router-dom';

import AccountOverview from './AccountOverview';
import ProfileHeader from './ProfileHeader';
import PersonalInfo from './PersonalInfo';

import { faCircleUser, faIdCard } from '@fortawesome/free-solid-svg-icons'

export default function ProfilePage() {
    const [userDto, setUserDto] = useState({
        nickname: '',
        email: '',
        dateReg: ''
    })
    const [isPending, setIsPending] = useState(true)
	useEffect(() => {
		axios.get('https://run.mocky.io/v3/5113146e-b4e7-41cc-aa11-0638da7f6602')
        .then((response) => {
			setIsPending(false);
			setUserDto(response.data);
		});
	}, []);

	return (
            <div className="bg-[#191919] h-[100vh]">
                <ProfileHeader nickname={isPending ? 'Loading...' : userDto.nickname}/>
                <main className="max-w-[1200px] mx-auto pl-3 pr-6">
                    <h2 className="border-b border-solid text-gray-200 border-neutral-400 mt-10 mb-4 pb-4">
                        Центр учётной записи
                    </h2>
                    <section className='flex'>
                        <nav>
                            <ul>
                                <li className='p-3 mb-3'>
                                    <NavLink className={'flex items-center text-[#6b707b]'} to={'/profile/account-overview'}>
                                        <FontAwesomeIcon icon={faCircleUser} className='mr-2 h-6 w-6'/> Обзор учётной записи
                                    </NavLink>
                                </li>
                                <li className='p-3 mb-3'>
                                    <NavLink className={'flex items-center text-[#6b707b]'} to={'/profile/personal-info'}>
                                        <FontAwesomeIcon icon={faIdCard} className='mr-2 h-6 w-6'/> Личные данные
                                    </NavLink>
                                </li>
                            </ul>
                        </nav>
                        <Routes>
                            <Route path='/account-overview' element={<AccountOverview userData={userDto}/>}/>
                            <Route path='/personal-info' element={<PersonalInfo userData={userDto}/>}/>
                        </Routes>
                    </section>
                </main>
            </div>
	);
}
