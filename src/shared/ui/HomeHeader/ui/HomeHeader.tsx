import { useEffect, useState } from 'react';
import { useUserStore } from '@app/store/user';

import { getImage } from '@entities/user/api/getUserImage';
import { logout } from '@entities/user/api/logout';

import { NavLink, Link } from 'react-router-dom';

import Modal from '@shared/ui/Modal/ui/Modal';
import { LoginModal } from '@entities/user/ui/LoginModal';

import cn from 'classnames';

import defaultUserIcon from '@shared/assets/defaultUserIcon.jpg';
import logo from '@shared/assets/logo.svg';

import styles from './HomeHeader.module.scss';
import { ROUTES } from '@shared/constants/routes';
import { UserRoles } from '@entities/user/constants';

export const HomeHeader = () => {
	const setImageUrl = useUserStore(state => state.setImageUrl);
	const setUsername = useUserStore(state => state.setUsername);
	const setUserRoles = useUserStore(state => state.setRoles);
	const imageUrl = useUserStore(state => state.imageUrl);
	const userRoles = useUserStore(state => state.roles);

	const isAuth = !!localStorage.getItem('accessToken');
	const [userPhoto, setUserPhoto] = useState(imageUrl);

	const [isActiveAvatar, setIsActiveAvatar] = useState(false);
	const [isActiveBurger, setIsActiveBurger] = useState(false);
	const [isShow, setIsShow] = useState(false);

	useEffect(() => {
		const fetchUserData = async () => {
			if (localStorage.getItem('refreshToken')) {
				try {
					const response = await getImage();
					setUsername(response.data.username);
					setUserRoles(response.data.roles);
					if (response.data.avatarUrl === 'null') {
						setUserPhoto(defaultUserIcon);
						return;
					}
					setUserPhoto(response.data.avatarUrl);
					setImageUrl(response.data.avatarUrl);
				} catch (error) {
					console.error('Ошибка при получении изображения:', error);
					setUserPhoto(defaultUserIcon);
				}
			}
		};
		fetchUserData();
	}, []);

	return (
		<header className='flex sticky top-0 z-30 items-center justify-between bg-[#212121] border-bottom border-[#2a2a2a] py-2 h-22'>
			<div className={styles.headerContainer}>
				<Link className='flex items-center' to='/'>
					<img className={styles.logo} src={logo} alt={'logo'} />
					<p className={styles.logoTitle}>kptc smp</p>
				</Link>
				<nav>
					<div
						className={cn(styles.burgerMenu, {
							[styles['active']]: isActiveBurger,
						})}
						onClick={() => setIsActiveBurger(prev => !prev)}
					>
						<span></span>
						<span></span>
						<span></span>
					</div>
					<ul
						className={cn(styles.headerList, {
							[styles['active']]: isActiveBurger,
						})}
					>
						<li>
							<NavLink className='text-white text-xl' to='/'>
								Главная
							</NavLink>
						</li>
						<li>
							<NavLink className='text-white text-xl' to='/news?page=1'>
								Новости
							</NavLink>
						</li>
						<li>
							<NavLink className='text-white text-xl' to='/guild?page=1'>
								Гильдия
							</NavLink>
						</li>
						<li>
							<NavLink className='text-white text-xl' to='/how-to-play'>
								Как играть
							</NavLink>
						</li>
					</ul>
				</nav>
				<section>
					{isAuth ? (
						<div className={styles.avatarContainer}>
							<img
								className={cn(styles.avatar, {
									[styles['avatarActive']]: isActiveAvatar,
								})}
								src={userPhoto}
								alt={':('}
								onClick={() => setIsActiveAvatar(prev => !prev)}
							/>
							<div className={styles.userPopup}>
								<Link
									className={styles.menuItem}
									to={'/profile/account-overview'}
								>
									Мой профиль
								</Link>
								<Link className={styles.menuItem} to={'/profile/personal-info'}>
									Настройки аккаунта
								</Link>
								{userRoles.includes(UserRoles.ADMIN) && (
									<Link className={styles.menuItem} to={ROUTES.admin}>
										Админка
									</Link>
								)}
								<button className={styles.menuItem} onClick={logout}>
									Выйти
								</button>
							</div>
						</div>
					) : (
						<button
							className='border-none text-white bg-blue-600'
							onClick={() => setIsShow(true)}
						>
							Войти
						</button>
					)}
				</section>
				<Modal isOpen={isShow} setClose={setIsShow} title={'Авторизация'}>
					<LoginModal type={'auth'} />
				</Modal>
			</div>
		</header>
	);
};
