import { FormEvent, useState } from 'react';

import ChangeEmailModal from '@widgets/ChangeEmailModal/ui/ChangeEmailModal';

import ProfileInfoBlock from '@shared/ui/ProfileInfoBlock/ProfileInfoBlock';
import InfoBlockItem from '@shared/ui/InfoBlockItem/InfoBlockItem';
import TextButton from '@shared/ui/TextButton/TextButton';
import ChangePasswordModal from '@widgets/ChangePasswordModal/ui/ChangePasswordModal';
import { changeUserPhoto } from '@entities/user/api/changeUserPhoto';
import Modal from '@shared/ui/Modal/Modal';

interface Props {
	userData: {
		username: string;
		email: string;
	};
}

export default function PersonalInfo({ userData }: Props) {

	const [currentModal, setCurrentModal] = useState(1);
	const [isShow, setIsShow] = useState(false);
	const [selectedImage, setSelectedImage] = useState(null);
	const [previewImage, setPreviewImage] = useState('');

	const [modalTitle, setModalTitle] = useState('');

	const [errorMessage, setErrorMessage] = useState('');

	const openModal = (number: number) => {
		setIsShow(true);
		setCurrentModal(number);
		switch (number) {
			case 1:
				setModalTitle('Верификация безопасности');
				break;
			case 2:
				setModalTitle('Установите новый пароль');
				break;
			case 3:
				setModalTitle('Смена аватарки');
				break;
		}
	};

	const handleUploadImage = (event: FormEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		setSelectedImage(file)
		if (file) {
			const objectUrl = URL.createObjectURL(file);
			setPreviewImage(objectUrl);
		}
	};

	const handleImageSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			const formData = new FormData();
			formData.append('image', selectedImage);
			await changeUserPhoto(formData);
			setErrorMessage('');
		} catch (error) {
			setErrorMessage(error.message);
		}
	};

	const handleModalClose = () => {
		setIsShow(false);
		setSelectedImage(null);
		setPreviewImage('');
	}

	return (
		<ProfileInfoBlock title='Личные данные' style='ml-8'>
			<InfoBlockItem
				itemTitle='Имя пользователя'
				subTitle={userData.username}
			/>
			<InfoBlockItem
				itemTitle='Электорнная почта'
				subTitle={userData.email}
				endItem={
					<TextButton
						text='Поменять элекронную почту'
						onPress={() => openModal(1)}
					/>
				}
			/>
			<InfoBlockItem
				itemTitle='Пароль'
				endItem={
					<TextButton text='Сменить пароль' onPress={() => openModal(2)} />
				}
			/>
			<InfoBlockItem
				itemTitle='Аватарка'
				endItem={
					<TextButton
						text='Сменить аватарку'
						onPress={() => openModal(3)}
					/>
				}
			/>

			<Modal
				isOpen={isShow}
				setClose={handleModalClose}
				title={modalTitle}
			>
				{currentModal === 1 && <ChangeEmailModal userData={userData} />}
				{currentModal === 2 && <ChangePasswordModal />}
				{currentModal === 3 && (
					<form onSubmit={handleImageSubmit}>
						{previewImage && (
							<img
								src={previewImage}
								alt={'preview'}
								className={'rounded-full'}
							/>
						)}
						<input
							type={'file'}
							accept={'image/png, image/jpeg, image/jpg'}
							onChange={handleUploadImage}
						/>
						{errorMessage && <p className={'text-red-700'}>{errorMessage}</p>}
						<button type={'submit'}>Отправить</button>
					</form>
				)}
			</Modal>
		</ProfileInfoBlock>
	);
}
