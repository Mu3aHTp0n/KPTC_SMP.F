import { ReactNode } from 'react';

import styles from './InfoBlockItem.module.scss'

interface Props {
	itemTitle: string;
	subTitle?: string;
	endItem?: ReactNode | string;
}

export default function InfoBlockItem({ itemTitle, subTitle, endItem }: Props) {
	return (
		<div className={styles.container}>
			<div>
				<h4 className={styles.blockTitle}>{itemTitle}</h4>
				{subTitle && <p className={styles.subTitle}>{subTitle}</p>}
			</div>
			{endItem && <p className={styles.endItem}>{endItem}</p>}
		</div>
	);
}
