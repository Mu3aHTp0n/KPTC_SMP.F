import { HTMLAttributes } from 'react';

import styles from './TextButton.module.scss'

interface Props extends HTMLAttributes<HTMLButtonElement> {
	text: string;
	onPress: () => void;
	disabled?: boolean;
}

export const TextButton = ({ text, onPress, disabled }: Props) => {
	return (
		<button
			className={styles.textButton}
			disabled={disabled}
			type={'button'}
			onClick={onPress}
		>
			{text}
		</button>
	);
}
