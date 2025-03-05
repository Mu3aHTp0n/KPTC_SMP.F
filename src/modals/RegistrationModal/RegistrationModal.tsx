import { useForm } from 'react-hook-form';
import InputField from '../../profile/InputField.tsx';
import { useOverlay } from '../../store/overlay.ts';
import Overlay from '../Overlay.tsx';
import ProfileModal from '../ProfileModal.tsx';

interface IForm {
	username: string,
	email: string,
	code: string,
	password: string,
	confirmPassword: string,
}

export default function RegistrationModal() {
	const { register, handleSubmit, formState: { errors } } = useForm<IForm>();
	const modalId = useOverlay(state => state.modalId)

	return (
		<>
			{ modalId === 1 && (
			<Overlay>
				<ProfileModal title="Регистрация">
					<InputField
						name="username"
						placeholderInput="Имя пользователя"
						maxLength={16}
						register={register}
						// value={regForm.username}
						// handleChange={handleChangeReg('username')}
					/>
					<InputField
						name="email"
						placeholderInput="Электронная почта"
						register={register}
						// value={regForm.email}
						// handleChange={handleChangeReg('email')}
						styles="mt-4"
					/>
					<InputField
						name="code"
						placeholderInput="Код"
						maxLength={6}
						pattern="d*"
						register={register}
						isHasRequestButton={true}
						// value={regForm.code}
						// handleChange={handleChangeReg('code')}
						styles="mt-4"
					/>
					<InputField
						name="password"
						placeholderInput="Пароль"
						type="password"
						maxLength={30}
						register={register}
						// value={regForm.password}
						// handleChange={handleChangeReg('password')}
						styles="mt-4"
					/>
					<InputField
						name="passwordConfirm"
						placeholderInput="Подтверждение пароля"
						type="password"
						maxLength={30}
						register={register}
						// value={regForm.confirmPassword}
						// handleChange={handleChangeReg('confirmPassword')}
						styles="mt-4"
					/>
					<button
						className="border-none text-white bg-blue-600 mt-3 w-full"
						type="submit"
					>
						Зарегистрироваться
					</button>
				</ProfileModal>
			</Overlay> )}
		</>
	);
}

// passwordMatch: 'пароли не совпадают'
// username: 'логин уже занят"
// code: неверный код
// email: почта должна быть валидной