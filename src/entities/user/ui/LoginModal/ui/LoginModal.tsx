import { useState } from 'react';

import { AuthModal } from '@entities/user/ui/AuthModal';
import RegistrationModal from '@entities/user/ui/RegistrationModal/ui';
import { PasswordResetModal } from '@entities/user';

interface IProps {
	type: string
}

export const LoginModal = ({ type }: IProps) => {
	const [modalType, setModalType] = useState<string>(type);

	if (modalType === 'auth') return <AuthModal setModalType={setModalType} />;
	if (modalType === 'registration') return <RegistrationModal />;
	if (modalType === 'passwordReset') return <PasswordResetModal />;
};