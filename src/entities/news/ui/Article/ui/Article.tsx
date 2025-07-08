import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faCalendar,
	faImage,
	faPenToSquare,
	faTrashCan,
} from '@fortawesome/free-regular-svg-icons';

import altImage from '@shared/assets/newsAltImage.jpg';

import styles from './Article.module.scss';

import {
	deleteNewsById,
	editNews,
	editNewsPreview,
	INewsListItem,
} from '@entities/news';
import { useNewsStore } from '@app/store/news';
import Modal from '@shared/ui/Modal/ui/Modal';
import InputField from '@shared/ui/InputField/ui/InputField';

interface Props extends INewsListItem {
	page?: string;
}

export const Article: React.FC<Props> = ({
	previewUrl,
	id,
	title,
	datePublication,
	page,
}) => {
	const { register } = useForm();

	const deleteNews = useNewsStore(state => state.removeArticle);
	const changeArticle = useNewsStore(state => state.changeArticle);
	const changePreview = useNewsStore(state => state.changePreview);

	const location = useLocation();

	const [articleData, setArticleData] = useState({
		title: title,
		content: '',
	});

	const [errorMessage, setErrorMessage] = useState('');

	const [isEditing, setIsEditing] = useState(false);
	const [isContentEditing, setIsContentEditing] = useState(false);
	const [isPreviewEditing, setIsPreviewEditing] = useState(false);

	const [selectedImage, setSelectedImage] = useState<File | null>(null);
	const [previewImage, setPreviewImage] = useState('');

	const deleteArticle = async () => {
		const isAlready = confirm('Вы уверены что хотите удалить эту новость?');
		if (!isAlready) return;
		await deleteNewsById(id);
		deleteNews(id);
		alert(`Новость "${title}" успешно удалена`);
	};

	const saveChanges = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const response = await editNews(id, articleData);
		changeArticle(id, response.data);
		setIsEditing(false);
		console.log(response);
	};

	const changePreviewUrl = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (!selectedImage) {
			setErrorMessage('Отсутствует изображение');
			return;
		}
		if (
			selectedImage.type !== 'image/jpeg' &&
			selectedImage.type !== 'image/png'
		) {
			setErrorMessage('Неверный тип файла. Доступны: jpg, jpeg, png');
			return;
		}
		const formData = new FormData();
		formData.append('image', selectedImage);
		const response = await editNewsPreview(id, formData);
		changePreview(id, response.data.imageUrl);
		alert('Превью новости изменено')
		setIsEditing(false);
		setPreviewImage('');
		setSelectedImage(null);
	};

	const changeEditingMode = () => {
		setIsPreviewEditing(false);
		setIsContentEditing(false);
		setIsEditing(prev => !prev);
		setPreviewImage('');
	};
	const changeContentEditingStatus = () => {
		changeEditingMode();
		setIsContentEditing(prev => !prev);
	};
	const changePreviewEditingStatus = () => {
		changeEditingMode();
		setIsPreviewEditing(prev => !prev);
	};

	const handleSelectImage = (event: ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files.length > 0) {
			const file = event.target.files[0];
			setSelectedImage(file);
			if (file) {
				const objectUrl = URL.createObjectURL(file);
				setPreviewImage(objectUrl);
			}
		}
	};

	const handleInputChange = (
		event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		setArticleData({
			...articleData,
			[event.target.name]: event.target.value,
		});
	};

	return (
		<article className={styles.article}>
			{location.pathname === '/news' ? (
				<Link to={`/news/${id}`}>
					{page === 'admin' ? (
						<div className={styles.actionContainer}>
							<img
								className={styles.articlePreview}
								src={previewUrl}
								onError={event => {
									event.currentTarget.src = altImage;
								}}
								alt={altImage}
							/>
							<div
								className={styles.action}
								onMouseDown={e => {
									e.stopPropagation();
									e.preventDefault();
								}}
							></div>
						</div>
					) : (
						<img
							className={styles.articlePreview}
							src={previewUrl}
							onError={event => {
								event.currentTarget.src = altImage;
							}}
							alt={altImage}
						/>
					)}
					<h3 className={styles.articleTitle}>
						{title.length > 33 ? title.substring(0, 32) + '...' : title}
					</h3>
				</Link>
			) : (
				<>
					<div className={styles.actionContainer}>
						<img
							className={styles.articlePreview}
							src={previewUrl}
							onError={event => {
								event.currentTarget.src = altImage;
							}}
							alt={altImage}
						/>
						<div
							className={styles.action}
						>
							<button
								title={'Сменить контент новости'}
								onClick={changeContentEditingStatus}
							>
								<FontAwesomeIcon icon={faPenToSquare} />
							</button>
							<button
								title={'Изменить превью'}
								onClick={changePreviewEditingStatus}
							>
								<FontAwesomeIcon icon={faImage} />
							</button>
							<button title={'Удалить новость'} onClick={deleteArticle}>
								<FontAwesomeIcon icon={faTrashCan} />
							</button>
						</div>
					</div>
					<Modal
						title={'Редактирование новости'}
						isOpen={isEditing}
						setClose={setIsEditing}
					>
						{isContentEditing && (
							<form className={styles.articleForm} onSubmit={saveChanges}>
								<InputField
									register={register}
									name={'title'}
									placeholder={'Заголовок новости'}
									value={articleData.title}
									onChange={handleInputChange}
									required={true}
									minLength={3}
									maxLength={100}
								/>
								<textarea
									className={styles.input}
									onChange={handleInputChange}
									placeholder={'Контент'}
									wrap={'hard'}
									name={'content'}
									value={articleData.content}
									required={true}
									minLength={8}
									maxLength={2000}
								/>
								{errorMessage && (
									<p className={'text-red-700'}>{errorMessage}</p>
								)}
								<button type={'submit'}>Save</button>
							</form>
						)}
						{isPreviewEditing && (
							<form className={styles.articleForm} onSubmit={changePreviewUrl}>
								{previewImage && <img src={previewImage} alt={'preview'} />}
								<input
									type={'file'}
									accept={'image/png, image/jpeg, image/jpg'}
									onChange={handleSelectImage}
								/>
								{errorMessage && (
									<p className={'text-red-700'}>{errorMessage}</p>
								)}
								<button type={'submit'}>Save</button>
							</form>
						)}
					</Modal>
					<h3 className={styles.articleTitle}>
						{title.length > 33 ? title.substring(0, 32) + '...' : title}
					</h3>
				</>
			)}
			<p className='article__date text-sm text-[#4A88FC] mt-2'>
				<FontAwesomeIcon className='mr-2' icon={faCalendar} />
				{datePublication}
			</p>
		</article>
	);
};
