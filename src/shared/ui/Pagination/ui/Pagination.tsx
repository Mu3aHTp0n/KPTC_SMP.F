import { useSearchParams } from 'react-router-dom';

import cn from 'classnames';

interface Props {
	paramName?: string;
	pageCounts: number;
}

export const Pagination = ({
	paramName = 'page',
	pageCounts,
}: Props) => {
	const [searchParams, setSearchParams] = useSearchParams();

	const currentPageValue = Number(searchParams.get(paramName)) || 1;

	const goToPage = (page: number) => {
		if (page < 1 || page > pageCounts) return;
		setSearchParams({ [paramName]: page.toString() })
	}

	const buttonList = [];
	for (let count = 1; count <= pageCounts; count++) {
		buttonList.push(
				<button
					onClick={() => goToPage(count)}
					key={count}
					className={cn('border-none text-white focus:outline-none', currentPageValue === count ? 'bg-blue-900 scale-95' : 'bg-blue-800 hover:bg-blue-900')}
				>
					{count}
				</button>
		);
	}

	return (
		<div className='flex justify-center gap-3 pb-4'>
			{buttonList.length !== 0 && (
				<button
					className='bg-blue-800 border-none text-white hover:bg-blue-900 focus:outline-none'
					onClick={() => goToPage(currentPageValue - 1)}
				>
					&#9001;
				</button>
			)}
			{buttonList}
			{buttonList.length !== 0 && (
				<button
					className='bg-blue-800 border-none text-white hover:bg-blue-900 focus:outline-none'
					onClick={() => goToPage(currentPageValue + 1)}
				>
					&#9002;
				</button>
			)}
		</div>
	);
}
