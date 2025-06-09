import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { fetchGuildOrders } from '@entities/guild/api/fetchGuildOrders';

import Loader from '@shared/ui/Loader/Loader';
import { Pagination } from '@shared/ui/Pagination';

import { useGuildStore } from '@app/store/guild';
import { OrderInformation, OrdersList } from '@entities/guild';

export default function GuildPage() {
	const guildOrders = useGuildStore(state => state.guildOrders);
	const setGuildOrders = useGuildStore(state => state.setGuildOrders);
	const pageCounts = useGuildStore(state => state.countPage);
	const setPageCount = useGuildStore(state => state.setCountPage);

	const [searchParams] = useSearchParams();
	const pageNumber: number = +searchParams.get('page')!;

	const [error, setError] = useState('');
	const [isPending, setIsPending] = useState(true);

	useEffect(() => {
		async function fetchGuildPage() {
			setIsPending(true);
			try {
				const response = await fetchGuildOrders(pageNumber);
				setGuildOrders(response.data.guildOrders);
				setPageCount(response.data.countPage);
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
							) : guildOrders.toString() ? (
								<OrdersList/>
							) : (
								<div className='bg-[#111] flex-[5] justify-center items-center px-6 py-12 rounded-xl'>
									<p className={'text-xl text-center'}>
										Пока нет никаких заданий
									</p>
								</div>
							)}
							<OrderInformation/>
						</section>
						<Pagination pageCounts={pageCounts} />
					</>
				)}
			</div>
		</div>
	);
}
