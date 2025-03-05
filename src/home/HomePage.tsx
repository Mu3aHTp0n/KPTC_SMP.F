import { useEffect } from 'react';

import { useOverlay } from '@store/overlay';

import edikSkin from '@shared/Эдик.png';
import danyaSkin from '@shared/Даня.png';
import egorSkin from '@shared/Егор.png';
import arturSkin from '@shared/Артур.png';
import dockychan from '@shared/Докчанский.png';
import ZM from '@shared/ЗМ.png';
import diamond from '@shared/diamond.png';
import leftFire from '@shared/Жёлтое_пламя.png';
import rightFire from '@shared/Красное_пламя.png';

import AuthModal from '../modals/AuthModal/AuthModal.tsx';
import RegistrationModal from '../modals/RegistrationModal/RegistrationModal.tsx';
import SkinCard from './SkinCard';

export default function HomePage() {
	const isOpen = useOverlay(state => state.isOpen);
	const setOpen = useOverlay(state => state.setOpen);
	const setModalId = useOverlay(state => state.setModalId);

	function openModal() {
		setModalId(1);
		setOpen();
	}
	useEffect(() => {
		if (!isOpen) {
			setModalId(0);
		}
	}, [isOpen]);

	return (
		<div className="bg-[#191919] min-h-[100vh] pt-8">
			<AuthModal />
			<RegistrationModal />
			<div className="container max-w-[1200px] mx-auto">
				<section className="flex gap-1 rounded-2xl overflow-hidden">
					<SkinCard
						source={edikSkin}
						styles="drop-shadow-[-2px_30px_3px_rgba(0,0,0,0.65)]"
					/>
					<SkinCard
						source={egorSkin}
						styles="drop-shadow-[6px_30px_3px_rgba(0,0,0,0.65)]"
					/>
					<div className="flex flex-col gap-1">
						<div className="flex justify-center h-1/2 items-center bg-[#111111]">
							<h1 className="text-7xl text-center font-bold text-blue-600">
								KPTC SMP
							</h1>
						</div>
						<div className="flex justify-center h-1/2 items-center bg-[#111111]">
							<button
								className="border-none text-white bg-blue-600"
								onClick={openModal}
							>
								Начать игру
							</button>
						</div>
					</div>
					<SkinCard
						source={danyaSkin}
						styles="drop-shadow-[-2px_40px_3px_rgba(0,0,0,0.65)]"
					/>
					<SkinCard
						source={arturSkin}
						styles="drop-shadow-[2px_30px_3px_rgba(0,0,0,0.65)]"
					/>
				</section>
				<section className="relative flex justify-between items-center mt-8 text-white bg-[#111111] rounded-2xl overflow-hidden">
					<div className="bg-[url(../shared/Жёлтое_пламя.png)]">
						<img
							className="absolute select-none left-0 h-full"
							draggable={false}
							loading="lazy"
							src={leftFire}
							alt=""
						/>
						<img
							className="relative select-none z-10 pt-3"
							draggable={false}
							src={dockychan}
							alt="Dockychan"
						/>
					</div>
					<div className="text-center">
						<div className="flex justify-center uppercase mx-auto">
							<img className="w-6 h-6" src={diamond} alt="*" />
							<h3>About</h3>
							<img className="w-6 h-6" src={diamond} alt="*" />
						</div>
						<div className="relative z-20 text-nowrap">
							<p>
								KPTC SMP - проект, где игрок сам выбирает свою
								судьбу.
							</p>
							<p>
								Объединяйся с другими игроками, или развивайся в
								одиночку.
							</p>
							<p>Присоединяйся к серверу уже сейчас. </p>
						</div>
					</div>
					<div>
						<img
							className="absolute select-none right-0 h-full"
							draggable={false}
							loading="lazy"
							src={rightFire}
							alt=""
						/>
						<img
							className="relative select-none z-10 pt-3 h-full"
							draggable={false}
							src={ZM}
							alt="ZigMan"
						/>
					</div>
				</section>
			</div>
		</div>
	);
}
