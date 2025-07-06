import React, { ReactNode, useEffect } from 'react';

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

	useEffect(() => {
		if (isOpen) document.body.style.overflowY = 'hidden';
		else document.body.style.overflowY = '';
	}, [isOpen])

	const modalOffCloseTouch = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
		event.stopPropagation();
	}

	const closeModal = () => {
		setClose(false);
	}

	return (
		<>
			{isOpen &&
				createPortal(
					<div className={styles.backdrop} onMouseDown={closeModal}>
						<section
							className={styles.modal}
							onMouseDown={modalOffCloseTouch}
						>
							<button
								className={styles.exitButton}
								onClick={closeModal}
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
