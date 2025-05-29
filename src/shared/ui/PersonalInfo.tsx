import { FormEvent, ChangeEvent, useState } from 'react';
import { useUserStore } from '@app/store/user';

import { changeUserPhoto } from '@entities/user/api/changeUserPhoto';

import ChangePasswordModal from '@widgets/ChangePasswordModal/ui/ChangePasswordModal';
import { ChangeEmailModal } from '@widgets/ChangeEmailModal/ui/ChangeEmailModal';
import Modal from '@shared/ui/Modal/ui/Modal';
import ProfileInfoBlock from '@shared/ui/ProfileInfoBlock/ProfileInfoBlock';
import { InfoBlockItem } from '@shared/ui/InfoBlockItem/ui/InfoBlockItem';
import Loader from '@shared/ui/Loader/Loader';
import { TextButton } from '@shared/ui/TextButton';

interface Props {
	userData: {
		username: string;
		email: string;
	};
}

export default function PersonalInfo({ userData }: Props) {

	const setImageUrl = useUserStore(state => state.setImageUrl)

	const [currentModal, setCurrentModal] = useState(1);
	const [isShow, setIsShow] = useState(false);
	const [selectedImage, setSelectedImage] = useState<File | null>(null);
	const [previewImage, setPreviewImage] = useState('');

	const [modalTitle, setModalTitle] = useState('');

	const [errorMessage, setErrorMessage] = useState('');
	const [isPending, setIsPending] = useState(false);

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

	const handleUploadImage = (event: ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files.length > 0) {
			const file = event.target.files[0];
			setSelectedImage(file)
			if (file) {
				const objectUrl = URL.createObjectURL(file);
				setPreviewImage(objectUrl);
			}
		}
	};

	const handleImageSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (!selectedImage) {
			setErrorMessage('Отсутствует изображение')
			return
		}
		setErrorMessage('')
		setIsPending(true);
		try {
			const formData = new FormData();
			formData.append('image', selectedImage);
			const response = await changeUserPhoto(formData);
			setErrorMessage('');
			setImageUrl(response.data.downloadUrl);
			alert('Аватарка успешно изменена')
			setIsShow(false);
			setSelectedImage(null);
			setPreviewImage('')
		} catch (error) {
			setErrorMessage(error.message);
		}
		finally {
			setIsPending(false);
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
				{currentModal === 1 && <ChangeEmailModal setShow={setIsShow} userData={userData} />}
				{currentModal === 2 && <ChangePasswordModal setShow={setIsShow} />}
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
						<button disabled={isPending} type={'submit'}>Отправить</button>
						{ isPending && (
							<>
								<Loader/>
								<p>Отправка запроса</p>
							</>
						)}
					</form>
				)}
			</Modal>
		</ProfileInfoBlock>
	);
}
