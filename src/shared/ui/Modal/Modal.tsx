import { ReactNode } from 'react';

import { createPortal } from 'react-dom';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {
	isOpen: boolean;
	setClose: (isOpen: boolean) => void;
	title: string;
	children?: ReactNode;
}

export default function Modal({ isOpen, setClose, title, children }: Props) {
	return (
		<>
			{isOpen &&
				createPortal(
					<div
						className='flex fixed z-50 
				inset-0 h-full overflow-auto 
				bg-black/60'
						onMouseDown={() => setClose(false)}
					>
						<section
							className='absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 w-[28rem] bg-white rounded-3xl p-8'
							onMouseDown={e => e.stopPropagation()}
						>
							<button
								className='absolute top-2 right-2 px-2 py-1 text-red-700 font-bold border-none hover:bg-slate-100'
								onClick={() => setClose(false)}
							>
								<FontAwesomeIcon icon={faXmark} className='text-2xl' />
							</button>
							<header className='flex justify-center'>
								<h3 className='text-2xl mb-6'>{title}</h3>
							</header>
							<main className='text-center text-sm'>{children}</main>
						</section>
					</div>,
					document.body,
				)}
		</>
	);
}
