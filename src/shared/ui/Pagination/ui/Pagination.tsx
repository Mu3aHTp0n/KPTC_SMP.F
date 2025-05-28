import { NavLink, useNavigate } from 'react-router-dom';

import cn from 'classnames';

interface Props {
	currentPage: string;
	countPage: number;
	pageNumber: number;
	pageCounts: number;
}

export const Pagination = ({
	currentPage,
	countPage,
	pageNumber,
	pageCounts,
}: Props) => {
	const navigate = useNavigate();

	const goToPage = (page: number) => {
		if (page < 1 || page > pageCounts) return;
		navigate(`/${currentPage}?page=${page}`);
	}

	const buttonList = [];
	for (let count = 1; count <= countPage; count++) {
		buttonList.push(
			<NavLink key={count} to={`/${currentPage}?page=${count}`}>
				<button
					className={cn('border-none text-white focus:outline-none', pageNumber === count ? 'bg-blue-900 scale-95' : 'bg-blue-800 hover:bg-blue-900')}
				>
					{count}
				</button>
			</NavLink>,
		);
	}

	return (
		<div className='flex justify-center gap-3 pb-4'>
			{buttonList.length !== 0 && (
				<button
					className='bg-blue-800 border-none text-white hover:bg-blue-900 focus:outline-none'
					onClick={() => goToPage(pageNumber - 1)}
				>
					&#9001;
				</button>
			)}
			{buttonList}
			{buttonList.length !== 0 && (
				<button
					className='bg-blue-800 border-none text-white hover:bg-blue-900 focus:outline-none'
					onClick={() => goToPage(pageNumber + 1)}
				>
					&#9002;
				</button>
			)}
		</div>
	);
}
