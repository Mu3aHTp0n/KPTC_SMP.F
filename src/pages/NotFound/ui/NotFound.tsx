import { Link } from 'react-router-dom';

import styles from './NotFound.module.scss'

const NotFound = () => {
	return (
		<div className={styles.pageContainer}>
			<header>
				<h5 className={styles.title}>Страница не найдена</h5>
			</header>
			<main className={styles.content}>
				<p className={styles.description}>404 page not found</p>
				<Link to={'/'}>Перейти на главную?</Link>
			</main>
		</div>
	);
};

export default NotFound;