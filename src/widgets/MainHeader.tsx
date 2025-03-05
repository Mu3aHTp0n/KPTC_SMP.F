import { useEffect, useState } from 'react';
import { useOverlay } from '@store/overlay';

import { getImage, getImageName } from './home/api/getUserImage';

import { NavLink, Link } from 'react-router-dom';

import defaultUserIcon from '@shared/defaultUserIcon.jpg';

export default function MainHeader() {
	const isOpen = useOverlay(state => state.isOpen);
	const setOpen = useOverlay(state => state.setOpen);
	const setModalId = useOverlay(state => state.setModalId);

	const isAuth = localStorage.getItem('accessToken');
	const [userPhoto, setUserPhoto] = useState('');

	function openModal() {
		setModalId(2);
		setOpen();
	}

	useEffect(() => {
		const fetchImage = async () => {
			try {
				const imageName = await getImageName();
				const tempUrl = await getImage(imageName);
				if (tempUrl) {
					setUserPhoto(tempUrl);
				}
				console.log(userPhoto);
			} catch (error) {
				console.error('Ошибка при получении изображения:', error);
				setUserPhoto(defaultUserIcon);
			}
		};

		fetchImage();
	}, []);

	useEffect(() => {
		if (!isOpen) {
			setModalId(0);
		}
	}, [isOpen]);

	return (
		<header className="flex sticky top-0 z-20 items-center justify-between bg-[#212121] border-bottom border-[#2a2a2a] px-12 py-2 h-22">
			<Link className="flex items-center" to="/">
				<img
					className="mr-2"
					src="https://spworlds.ru/img/logo.svg"
					alt="logo"
				/>
				<p className="text-xl font-bold text-white">kptc smp</p>
			</Link>
			<ul className="flex justify-between gap-10">
				<li>
					<NavLink className="text-white text-xl" to="/">
						Главная
					</NavLink>
				</li>
				<li>
					<NavLink className="text-white text-xl" to="/news?page=1">
						Новости
					</NavLink>
				</li>
				<li>
					<NavLink className="text-white text-xl" to="/guild?page=1">
						Гильдия
					</NavLink>
				</li>
				<li>
					<NavLink className="text-white text-xl" to="/how-to-play">
						Как играть
					</NavLink>
				</li>
			</ul>
			<div>
				{isAuth && (
					<Link to={'/profile/account-overview'}>
						{userPhoto ? (
							<img
								className="bg-white h-12 w-12 rounded-full"
								loading="lazy"
								src={`${userPhoto}`}
								alt={'*'}
							/>
						) : (
							<img
								className="bg-white h-12 w-12 rounded-full"
								src={defaultUserIcon}
								alt={'*'}
							/>
						)}
					</Link>
				)}
				{!isAuth && (
					<button
						className="border-none text-white bg-blue-600"
						onClick={openModal}
					>
						Войти
					</button>
				)}
			</div>
		</header>
	);
}
