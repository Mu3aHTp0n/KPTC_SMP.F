import { Skins } from '@shared/ui/Skins';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-regular-svg-icons/faCopy';
import { Outlet } from 'react-router-dom';

import dockychan from '../assets/Докчанский.png';
import zigMan from '../assets/ЗМ.png';
import diamond from '../assets/diamond.png';
import leftFire from '../assets/Жёлтое_пламя.png';
import rightFire from '../assets/Красное_пламя.png';
import MatrixEdik from '../assets/MatrixEdik.png'
import voiceChat from '../assets/Войс и эмоции.png'

import styles from './HomePage.module.scss'
import { minecraftServerApi } from '@shared/constants/minecraftServerApi';

export default function HomePage() {

	const copyServerIp = async () => {
		await navigator.clipboard.writeText(minecraftServerApi);
		alert('Успешно скопировано')
	}

	return (
		<main className={styles.content}>
			<div className='container max-w-[1200px] mx-auto'>
				<Outlet/>
				<Skins />
				<section className={styles.about}>
					<div className='bg-[url(../shared/Жёлтое_пламя.png)]'>
						<img
							className='absolute select-none left-0 h-full'
							draggable={false}
							loading='lazy'
							src={leftFire}
							alt=''
						/>
						<img
							className={styles.playerImage}
							draggable={false}
							src={dockychan}
							alt='Dockychan'
						/>
					</div>
					<div className='text-center'>
						<div className='flex justify-center uppercase mx-auto'>
							<img className='w-6 h-6' src={diamond} alt='*' />
							<h3>About</h3>
							<img className='w-6 h-6' src={diamond} alt='*' />
						</div>
						<div className='relative z-20 text-base text-nowrap'>
							<p>KPTC SMP - проект, где игрок сам выбирает свою судьбу.</p>
							<p>Объединяйся с другими игроками, или развивайся в одиночку.</p>
							<p>Присоединяйся к серверу уже сейчас. </p>
							<code>
								{minecraftServerApi}
								<FontAwesomeIcon onClick={copyServerIp} className={'ml-2 cursor-pointer'} icon={faCopy} />
							</code>
						</div>
					</div>
					<div>
						<img
							className='absolute select-none right-0 h-full'
							draggable={false}
							loading='lazy'
							src={rightFire}
							alt=''
						/>
						<img
							className={styles.playerImage}
							draggable={false}
							src={zigMan}
							alt='ZigMan'
						/>
					</div>
				</section>
				<section className={'flex justify-around'}>
					<div className={'flex-2 pt-32'}>
						<h3 className={'text-2xl border-b-2 border-solid'}>Ролевые игры</h3>
						<p>Создавайте персонажей и истории</p>
					</div>
					<img className={styles.matrixImage} src={MatrixEdik} alt='' />
				</section>
				<section className={styles.voiceSection}>
					<img className={'flex-3 max-w-[600px]'} src={voiceChat} alt='' />
					<div className={'pt-32'}>
						<h3 className={'text-2xl border-b-2 border-solid'}>
							Голосовой чат и эмоции
						</h3>
						<p>Общайся и выражай эмоции</p>
					</div>
				</section>
			</div>
		</main>
	);
}
