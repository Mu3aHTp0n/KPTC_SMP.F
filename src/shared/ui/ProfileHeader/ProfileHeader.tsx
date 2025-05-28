import { useNavigate, Link } from "react-router-dom"

import cn from "classnames"

import styles from './ProfileHeader.module.scss'
import logo from '@shared/assets/logo.svg';

export default function ProfileHeader({nickname = 'Loading...'}) {

	const navigate = useNavigate()

	const exitAccount = () => {
		localStorage.removeItem("accessToken");
		localStorage.removeItem("refreshToken");
		navigate('/')
		location.reload();
	}

	return (
		<header className={styles.header}>
			<Link className='flex items-center' to='/'>
				<img className={styles.logo} src={logo} alt={'logo'} />
				<p className='text-xl font-bold text-white'>kptc smp</p>
			</Link>
			<section className={cn(styles.action, 'group')}>
				<button className='bg-[#212121] text-white'>{nickname}</button>
				<button
					className={cn(
						styles.exitButton,
					)}
					onClick={() => exitAccount()}
				>
					Выйти
				</button>
			</section>
		</header>
	);
}
