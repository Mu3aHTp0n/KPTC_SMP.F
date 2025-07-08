import { ReactNode } from 'react';

interface Props {
	title: string;
	LinkButton?: ReactNode | string;
	children?: ReactNode;
	style?: string;
}

export default function ProfileInfoBlock({
	title,
	LinkButton,
	children,
	style,
}: Props) {
	return (
		<section className={`flex-1 rounded-2xl pt-2 px-5 bg-neutral-800 ${style}`}>
			<div>
				<div className='flex justify-between items-center'>
					<h3 className='py-4 text-gray-100'>{title}</h3>
					{LinkButton}
				</div>
				<hr className='-mx-5 my-2 border-neutral-400' />
			</div>
			<div>{children}</div>
		</section>
	);
}
