import { Skins } from '@shared/ui/Skins';

import dockychan from '../assets/Докчанский.png';
import zigMan from '../assets/ЗМ.png';
import diamond from '../assets/diamond.png';
import leftFire from '../assets/Жёлтое_пламя.png';
import rightFire from '../assets/Красное_пламя.png';

export default function HomePage() {
	return (
		<div className='bg-[#191919] pt-8'>
			<div className='container max-w-[1200px] mx-auto'>
				<Skins/>
				<section className='relative flex justify-between items-center mt-8 text-white bg-[#111111] rounded-2xl overflow-hidden'>
					<div className='bg-[url(../shared/Жёлтое_пламя.png)]'>
						<img
							className='absolute select-none left-0 h-full'
							draggable={false}
							loading='lazy'
							src={leftFire}
							alt=''
						/>
						<img
							className='relative select-none z-10 pt-3'
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
						<div className='relative z-20 text-nowrap'>
							<p>KPTC SMP - проект, где игрок сам выбирает свою судьбу.</p>
							<p>Объединяйся с другими игроками, или развивайся в одиночку.</p>
							<p>Присоединяйся к серверу уже сейчас. </p>
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
							className='relative select-none z-10 pt-3 h-full'
							draggable={false}
							src={zigMan}
							alt='ZigMan'
						/>
					</div>
				</section>
			</div>
		</div>
	);
}
