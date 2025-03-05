import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { fetchPageData } from '@pages/NewsPage/api/fetchPageData';
import Loader from '@shared/components/Loader/Loader';
import Pagination from '@widgets/Pagination';

import quest from '@shared/images/quest.png';

export default function GuildPage() {
	const [searchParams] = useSearchParams();
	const pageNumber = +searchParams.get('page');

	const [error, setError] = useState('');
	const [isPending, setIsPending] = useState(true);
	const [questList, setQuestList] = useState({
		guildOrders: [],
		countPage: 0,
	});

	useEffect(() => {
		async function fetchGuildPage() {
			try {
				const response = await fetchPageData('guild', pageNumber);
				setQuestList(response);
				setError('');
			} catch (error) {
				console.log(error);
				setError(error.message);
			} finally {
				setIsPending(false);
			}
		}
		fetchGuildPage();
	}, [pageNumber]);

	const images = questList.guildOrders?.map((result) => {
		return <img className="cursor-pointer" src={quest} alt="Quest" />;
	});

	return (
		<div className="bg-[#191919] min-h-[100vh] pt-8 text-white">
			<div className="container max-w-screen-xl mx-auto">
				<header className="bg-[#111111] mb-4 rounded-lg px-6 py-2">
					<h2>Еженедельные задания</h2>
				</header>
				{error && (
					<p className="text-red-700 text-xl text-center">{error}</p>
				)}
				{isPending ? (
					<Loader />
				) : (
					<>
						<section className="flex gap-3 mb-10">
							<div className="bg-[#111] flex-[3] px-2 py-4 grid gap-y-10 gap-x-4 grid-cols-3 rounded-xl">
								{images}
							</div>
							<div className="bg-[#111] flex-[2] rounded-xl"></div>
						</section>
						<Pagination
							currentPage="guild"
							countPage={questList.countPage}
							pageNumber={+pageNumber}
							pageCounts={questList.countPage}
						/>
					</>
				)}
			</div>
		</div>
	);
}
