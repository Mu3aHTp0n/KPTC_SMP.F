import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useNewsStore } from '@app/store/news';

import { fetchNews } from '@entities/news/api/fetchNews';

import { NewsList } from '@entities/news/ui/NewsList/NewsList';
import Loader from '@shared/ui/Loader/Loader';
import { Pagination } from '@shared/ui/Pagination';

import cn from 'classnames';

import styles from '@entities/news/ui/Article/ui/Article.module.scss';

export default function NewsPage() {
	const [searchParams] = useSearchParams();

	const newsList = useNewsStore(state => state.newsList);
	const setNewsList = useNewsStore(state => state.setNewsList);
	const countNewsPage = useNewsStore(state => state.countPage);
	const setCountNewsPage = useNewsStore(state => state.setCountPage);

	const pageNumber = +searchParams.get('page')!;

	const [error, setError] = useState('');
	const [isPending, setIsPending] = useState(true);

	useEffect(() => {
		async function loadNews() {
			setNewsList([]);
			setIsPending(true);
			try {
				const response = await fetchNews(pageNumber);
				setNewsList(response.data.news);
				setCountNewsPage(response.data.countPage);
				setError('');
			} catch (error) {
				setError(error.message);
			} finally {
				setIsPending(false);
			}
		}
		loadNews();
	}, [pageNumber]);

	return (
		<div className='bg-[#191919] pt-8 '>
			{!!error && <p className='text-red-700 text-xl text-center'>{error}</p>}
			{isPending ? (
				<Loader />
			) : (
				<>
					{newsList.toString() ? (
						<>
							<div className={cn(styles.articlesContainer, 'container')}>
								<NewsList news={newsList} />
							</div>
							<Pagination pageCounts={countNewsPage} />
						</>
					) : (
						<p
							className={
								'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-100 text-3xl'
							}
						>
							Пока нет новостей
						</p>
					)}
				</>
			)}
		</div>
	);
}
