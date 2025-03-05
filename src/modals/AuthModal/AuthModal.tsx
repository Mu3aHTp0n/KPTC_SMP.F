import { SubmitHandler, useForm } from 'react-hook-form';

import InputField from '../../profile/InputField.tsx';
import Overlay from '../Overlay.tsx';
import ProfileModal from '../ProfileModal.tsx';
import axios from 'axios';
import { useOverlay } from '../../store/overlay.ts';

interface IForm {
	nickname: string;
	password: string;
}

export default function AuthModal() {
	const { register, handleSubmit, formState: { errors } } = useForm<IForm>();

	const modalId = useOverlay(state => state.modalId);

	const BACKEND_API = import.meta.env.VITE_BACKEND_HOST;

	const onSubmit: SubmitHandler<IForm> = (data) => {
		console.log(data);
		axios
			.post(`${BACKEND_API}/auth/login`, data)
			.then((response) => {
				console.log(response);
				localStorage.setItem('accessToken', response.data.token)
			});
	};

	return (
		<>
			{ modalId === 2 && (
				<Overlay>
					<ProfileModal title="Авторизация">
						<form onSubmit={handleSubmit(onSubmit)}>
							<InputField
								name="username"
								placeholderInput="Ник"
								maxLength={16}
								register={register}
							/>
							<InputField
								name="password"
								placeholderInput="Пароль"
								type="password"
								maxLength={30}
								register={register}
								styles="mt-4"
							/>
							<button className="border-none text-white bg-blue-600 mt-4" type="submit">Войти</button>
						</form>
					</ProfileModal>
				</Overlay>
			)}
		</>
	);
}
