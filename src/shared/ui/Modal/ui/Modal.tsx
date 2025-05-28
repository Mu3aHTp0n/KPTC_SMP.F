import { ReactNode } from 'react';

import { createPortal } from 'react-dom';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './Modal.module.scss';

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
					<div className={styles.backdrop} onMouseDown={() => setClose(false)}>
						<section
							className={styles.modal}
							onMouseDown={e => e.stopPropagation()}
						>
							<button
								className={styles.exitButton}
								onClick={() => setClose(false)}
							>
								<FontAwesomeIcon icon={faXmark} className='text-2xl' />
							</button>
							<header className={styles.modalHeader}>
								<h3 className={styles.modalTitle}>{title}</h3>
							</header>
							<main className={styles.modalBody}>{children}</main>
						</section>
					</div>,
					document.body,
				)}
		</>
	);
}
