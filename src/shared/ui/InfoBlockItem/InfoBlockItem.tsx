import { ReactNode } from 'react';

interface Props {
	itemTitle: string;
	subTitle?: string;
	endItem?: ReactNode | string;
}

export default function InfoBlockItem({ itemTitle, subTitle, endItem }: Props) {
	return (
		<div className='flex justify-between items-center mb-2 py-4'>
			<div>
				<h4 className='text-gray-400'>{itemTitle}</h4>
				{subTitle && <p className='text-[#dadce0] mt-1 mr-3'>{subTitle}</p>}
			</div>
			{endItem && <p className='text-[#c4c9d1]'>{endItem}</p>}
		</div>
	);
}
