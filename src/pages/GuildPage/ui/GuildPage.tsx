import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { fetchGuildOrders } from '@entities/guild/api/fetchGuildOrders';

import Loader from '@shared/ui/Loader/Loader';
import { Pagination } from '@shared/ui/Pagination';

import quest from '@shared/assets/quest.png';

import { OrderListResponse } from '@entities/guild';

interface IQuest {
	id: number;
	header: string;
	message: string;
	pseudonym: string;
}

export default function GuildPage() {
	const [searchParams] = useSearchParams();
	const pageNumber: number = +searchParams.get('page')!;

	const [error, setError] = useState('');
	const [isPending, setIsPending] = useState(true);
	const [questList, setQuestList] = useState<OrderListResponse>({
		guildOrders: [],
		countPage: 0,
	});
	const [guildQuest, setGuildQuest] = useState<IQuest>();

	useEffect(() => {
		async function fetchGuildPage() {
			setQuestList({
				guildOrders: [],
				countPage: 0,
			});
			setIsPending(true);
			try {
				const response = await fetchGuildOrders(pageNumber);
				setQuestList(response.data);
				setError('');
			} catch (error) {
				setError(error.message);
			} finally {
				setIsPending(false);
			}
		}
		fetchGuildPage();
	}, [pageNumber]);

	return (
		<div className='bg-[#191919] pt-8 text-white'>
			<div className='container px-4 max-w-screen-xl mx-auto'>
				<header className='bg-[#111111] mb-4 rounded-lg px-6 py-2'>
					<h2>Еженедельные задания</h2>
				</header>
				{error && <p className='text-red-700 text-xl text-center'>{error}</p>}
				{isPending ? (
					<Loader />
				) : (
					<>
						<section className='flex md:flex-row flex-col gap-3 mb-10'>
							{isPending ? (
								<Loader />
							) : questList.guildOrders.toString() ? (
								<div className='bg-[#111] flex-[5] items-center px-2 py-4 grid gap-y-10 gap-x-4 grid-cols-2 grid-rows-3 lg:grid-cols-3 lg:grid-rows-2 rounded-xl'>
									{questList.guildOrders?.map(order => {
										return (
											<img
												className='cursor-pointer transiotion-filter duration-200 ease hover:brightness-75'
												key={order.id}
												title={order.header}
												onClick={() => setGuildQuest(order)}
												src={quest}
												alt='Quest'
											/>
										);
									})}
								</div>
							) : (
								<div className='bg-[#111] flex-[5] justify-center items-center px-6 py-12 rounded-xl'>
									<p className={'text-xl text-center'}>
										Пока нет никаких заданий
									</p>
								</div>
							)}
							<div className='bg-[#111] flex-[5] w-full lg:max-w-[45%] text-xl rounded-xl p-4'>
								<h3
									style={{ wordBreak: 'break-word' }}
									className='text-center text-2xl mb-4'
								>
									{guildQuest?.header}
								</h3>
								<p style={{ wordBreak: 'break-word' }}>{guildQuest?.message}</p>
								<span className='text-base text-blue-600 font-bold'>
									{guildQuest?.pseudonym}
								</span>
							</div>
						</section>
						<Pagination
							currentPage='guild'
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
