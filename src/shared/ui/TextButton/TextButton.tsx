import { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLButtonElement> {
	text: string;
	onPress: () => void;
	disabled?: boolean;
}

export default function TextButton({ text, onPress, disabled }: Props) {
	return (
		<button
			className='p-0 border-none text-sm text-[#4A88FC] transition duration-100 hover:text-[#79BBFF] focus:outline-none'
			disabled={disabled}
			type={'button'}
			onClick={onPress}
		>
			{text}
		</button>
	);
}
