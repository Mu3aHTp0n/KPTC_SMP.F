import { FC, ReactNode, useState } from 'react';

import cn from 'classnames';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons/faCaretDown';

import styles from './Accordion.module.scss'

interface IProps {
	title: string;
	children: ReactNode;
}

export const Accordion: FC<IProps> = ({ title, children }) => {
	const [isOpen, setIsOpen] = useState(true);
	
	const handleOpenMenu = () => {
		setIsOpen(prev => !prev)
	}

	return (
		<article className={styles.container}>
			<header className={styles.header} onClick={handleOpenMenu}>
				<FontAwesomeIcon className={cn(styles.svg, {[styles['accordionActive']]: isOpen})} icon={faCaretDown} />
				<h3 className={styles.accordionTitle}>{title}</h3>
			</header>
			<main className={cn(styles.accordionBody, {[styles['accordionActive']]: isOpen})}>
				{children}
			</main>
		</article>
	);
};