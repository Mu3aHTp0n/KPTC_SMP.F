import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import { fetchNewsById } from '@entities/news/api/fetchNewsById';

import altImage from '@shared/assets/newsAltImage.jpg';
import { INewsDetail } from '@entities/news';

export default function NewsDetailPage() {
	const { id } = useParams();

	const [articleData, setArticleData] = useState<INewsDetail>({
		id: 0,
		title: '',
		content: '',
		datePublication: '',
		previewUrl: '',
	});

	useEffect(() => {
		const fetchNews = async () => {
			const response = await fetchNewsById(+id!);
			setArticleData(response.data);
		};
		fetchNews();
	}, []);

	return (
		<div className='bg-neutral-950 text-white min-h-[100vh]'>
			<main className='bg-zinc-800 max-w-5xl min-h-[100vh] mx-auto px-10 py-8'>
				<header>
					<div className={'flex items-center justify-between'}>
						<h1 className='text-4xl break-all mb-3'>{articleData.title}</h1>
						<Link className={'ml-4'} to={'/news?page=1'}>Вернуться к новостям</Link>
					</div>
					<p className='text-blue-500 mb-2'>
						{articleData.datePublication.slice(0, 10)}
					</p>
				</header>
				<hr className='w-full border border-solid border-gray-700 mb-4' />
				<div className='relative overflow-hidden p-12'>
					<img
						className='absolute left-1/2 -translate-x-1/2 w-3/4 rounded-2xl mb-4 blur-[24px] brightness-50 select-none'
						src={articleData.previewUrl}
						draggable={false}
						onError={event => {
							event.currentTarget.src = altImage;
						}}
						alt={'Network error'}
					/>
					<img
						className='z-10 relative rounded-2xl max-h-[500px] mx-auto my-6'
						src={articleData.previewUrl}
						onError={event => {
							event.currentTarget.src = altImage;
						}}
						alt={'Network error'}
					/>
				</div>
				<hr className='w-full border-neutral-200 mb-4' />
				<p style={{wordBreak: 'break-word', whiteSpace: 'pre-wrap'}}>{articleData.content}</p>
			</main>
		</div>
	);
}
