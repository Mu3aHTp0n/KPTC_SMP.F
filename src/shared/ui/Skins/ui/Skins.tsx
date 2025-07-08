import { useState } from 'react';

import { Link } from 'react-router-dom';
import { SkinCard } from '@shared/ui/SkinCard';
import Modal from '@shared/ui/Modal/ui/Modal';

import edikSkin from '@pages/HomePage/assets/Эдик.png';
import egorSkin from '@pages/HomePage/assets/Егор.png';
import danyaSkin from '@pages/HomePage/assets/Даня.png';
import arturSkin from '@pages/HomePage/assets/Артур.png';

import styles from './Skins.module.scss'
import { LoginModal } from '@entities/user/ui/LoginModal';

export const Skins = () => {

	const [isShow, setIsShow] = useState(false);

	const isLogged = !!localStorage.getItem('accessToken');

	return (
		<section className={styles.skinsContainer}>
			<SkinCard
				source={edikSkin}
				styles='drop-shadow-[-2px_30px_3px_rgba(0,0,0,0.65)]'
			/>
			<SkinCard
				source={egorSkin}
				styles='drop-shadow-[6px_30px_3px_rgba(0,0,0,0.65)]'
			/>
			<div className='flex flex-col gap-1'>
				<div className='flex justify-center h-1/2 items-center bg-[#111111]'>
					<h1 className={styles.serverTitle}>
						KPTC SMP
					</h1>
				</div>
				<div className='flex justify-center h-1/2 items-center bg-[#111111]'>
					{isLogged ? (
						<Link to={'/how-to-play'}>
							<button className='border-none text-white bg-blue-600 text-xl'>
								Начать игру
							</button>
						</Link>
					) : (
						<button
							className='border-none text-white bg-blue-600 text-xl'
							onClick={() => setIsShow(true)}
						>
							Начать игру
						</button>
					)}
				</div>
			</div>
			<SkinCard
				source={danyaSkin}
				styles='drop-shadow-[-2px_40px_3px_rgba(0,0,0,0.65)]'
			/>
			<SkinCard
				source={arturSkin}
				styles='drop-shadow-[2px_30px_3px_rgba(0,0,0,0.65)]'
			/>
			<Modal isOpen={isShow} setClose={setIsShow} title={'Регистрация'}>
				<LoginModal type={'registration'}/>
			</Modal>
		</section>
	)
}