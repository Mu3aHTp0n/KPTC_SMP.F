import { useState, useEffect, lazy, Suspense } from 'react';
import { useSearchParams } from 'react-router-dom';

import { fetchPageData } from './api/fetchPageData';

import '../../article.css';

import Loader from '@shared/components/Loader/Loader';
import Pagination from '../../widgets/Pagination';
const NewsList = lazy(() => import('../../news/NewsList'));

export default function NewsPage() {
	const [searchParams] = useSearchParams();
	const pageNumber = +searchParams.get('page');

	const [newsList, setNewsList] = useState({
		news: [],
		countPage: 0,
	});
	const [error, setError] = useState('');
	const [isPending, setIsPending] = useState(true);

	useEffect(() => {
		async function loadNews() {
			try {
				const data = await fetchPageData('news', pageNumber);
				setNewsList(data);
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
		<div className="bg-[#191919] min-h-[100vh] pt-8">
			{error !== '' && (
				<p className="text-red-700 text-xl text-center">{error}</p>
			)}
			{isPending ? (
				<Loader />
			) : (
				<>
					<div className="articles__container container max-w-7xl mx-auto mb-16 text-white grid grid-cols-3 grid-flow-row gap-8">
						<NewsList newsList={newsList.news} />
					</div>
					<Pagination
						currentPage="news"
						countPage={newsList.countPage}
						pageNumber={+pageNumber}
						pageCounts={newsList.countPage}
					/>
				</>
			)}
		</div>
	);
}
