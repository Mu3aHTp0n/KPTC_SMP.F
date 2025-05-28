import { useState, useEffect } from 'react';
import { useUserStore } from '@app/store/user';
import { fetchUserData } from '@entities/user/api/fetchUserData';

import { Route, Routes, NavLink } from 'react-router-dom';

import AccountOverview from '@shared/ui/AccountOverview';
import ProfileHeader from '@shared/ui/ProfileHeader/ProfileHeader.tsx';
import PersonalInfo from '@shared/ui/PersonalInfo';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser, faIdCard } from '@fortawesome/free-solid-svg-icons';

export default function ProfilePage() {
	const setEmail = useUserStore(state => state.setEmail);
	const setDateRegistration = useUserStore(state => state.setRegistrationDate);

	const username = useUserStore(state => state.username);
	const email = useUserStore(state => state.email);
	const registrationDate = useUserStore(state => state.registrationDate);

	const [userDto, setUserDto] = useState({
		username: username,
		email: email,
		registrationDate: registrationDate,
	});

	const [isPending, setIsPending] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetchUserData();
			response.data.registrationDate = response.data.registrationDate.split('-').reverse().join('.')
			setIsPending(false);
			setUserDto(response.data);
			setDateRegistration(response.data.registrationDate);
			setEmail(response.data.email);
		};
		fetchData()
	}, []);

	return (
		<div className='bg-[#191919] h-[100vh]'>
			<ProfileHeader nickname={isPending ? 'Loading...' : userDto.username} />
			<main className='max-w-[1200px] mx-auto pl-3 pr-6'>
				<h2 className='border-b border-solid text-gray-200 border-neutral-400 mt-10 mb-4 pb-4'>
					Центр учётной записи
				</h2>
				<section className='flex'>
					<nav>
						<ul>
							<li className='p-3 mb-3'>
								<NavLink
									className={'flex items-center text-[#6b707b]'}
									to={'/profile/account-overview'}
								>
									<FontAwesomeIcon
										icon={faCircleUser}
										className='mr-2 h-6 w-6'
									/>{' '}
									Обзор учётной записи
								</NavLink>
							</li>
							<li className='p-3 mb-3'>
								<NavLink
									className={'flex items-center text-[#6b707b]'}
									to={'/profile/personal-info'}
								>
									<FontAwesomeIcon icon={faIdCard} className='mr-2 h-6 w-6' />{' '}
									Личные данные
								</NavLink>
							</li>
						</ul>
					</nav>
					<Routes>
						<Route
							path='/account-overview'
							element={<AccountOverview userData={userDto} />}
						/>
						<Route
							path='/personal-info'
							element={<PersonalInfo userData={userDto} />}
						/>
					</Routes>
				</section>
			</main>
		</div>
	);
}
