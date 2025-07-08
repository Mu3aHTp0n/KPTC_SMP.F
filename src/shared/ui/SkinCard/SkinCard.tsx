import style from './SkinCard.module.scss'

interface Props {
    source: string,
    alt?: string,
    styles?: string
}

export const SkinCard = ({source, alt, styles}: Props) => {
	return (
		<div className={style.card}>
			<img
				className={styles}
				src={source}
				alt={alt}
			/>
		</div>
	);
}
