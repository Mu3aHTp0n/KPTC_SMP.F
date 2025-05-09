import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { fetchNews } from '@entities/news/api/fetchNews';

import { NewsList } from '@entities/news/ui/NewsList/NewsList';
import { Pagination } from '@shared/ui/Pagination';
import Loader from '@shared/ui/Loader/Loader';

import '@entities/news/ui/Article/article.css';
import { IFetchNews } from '@entities/news/model';

export default function NewsPage() {
	const [searchParams] = useSearchParams();

	const pageNumber = +searchParams.get('page');

	const [newsList, setNewsList] = useState<IFetchNews>({
		news: [],
		countPage: 1,
	});
	const [error, setError] = useState('');
	const [isPending, setIsPending] = useState(true);

	useEffect(() => {
		async function loadNews() {
			try {
				const response = await fetchNews(pageNumber);
				setNewsList(response.data);
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
		<div className='bg-[#191919] pt-8'>
			{error !== '' && (
				<p className='text-red-700 text-xl text-center'>{error}</p>
			)}
			{isPending ? (
				<Loader />
			) : (
				<>
					{newsList.news.toString() ? (
						<>
							<div className='articles__container container max-w-7xl mx-auto mb-16 text-white grid grid-cols-3 grid-rows-2 grid-flow-row gap-8'>
								<NewsList news={newsList.news} />
							</div>
							<Pagination
								currentPage='news'
								countPage={newsList.countPage}
								pageNumber={+pageNumber}
								pageCounts={newsList.countPage}
							/>
						</>
					) : (
						<p className={'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-100 text-3xl'}>
							Пока нет новостей
						</p>
					)}
				</>
			)}
		</div>
	);
}
