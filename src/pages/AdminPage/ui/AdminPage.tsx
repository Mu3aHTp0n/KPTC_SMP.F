import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useUserStore } from '@app/store/user';
import { useNewsStore } from '@app/store/news';
import { useGuildStore } from '@app/store/guild';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

import { getImage } from '@entities/user';

import Loader from '@shared/ui/Loader/Loader';
import { Pagination } from '@shared/ui/Pagination';
import Modal from '@shared/ui/Modal/ui/Modal';
import InputField from '@shared/ui/InputField/ui/InputField';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import styles from './AdminPage.module.scss';
import newsStyles from '@entities/news/ui/Article/ui/Article.module.scss';

import { createNews, fetchNews, NewsList } from '@entities/news';
import {
	fetchGuildOrders,
	OrderInformation,
	OrdersList,
} from '@entities/guild';

import { UserRoles } from '@entities/user/constants';
import { createOrder } from '@entities/guild/api/createOrder';

interface newsRequestDto {
	title: string;
	content: string;
}

const AdminPage = () => {
	const { register } = useForm();

	const userRoles = useUserStore(state => state.roles);
	const setUserRoles = useUserStore(state => state.setRoles);

	const newsList = useNewsStore(state => state.newsList);
	const setNewsList = useNewsStore(state => state.setNewsList);
	const countNewsPage = useNewsStore(state => state.countPage);
	const setCountNewsPage = useNewsStore(state => state.setCountPage);

	const setGuildOrders = useGuildStore(state => state.setGuildOrders);
	const countGuildPage = useGuildStore(state => state.countPage);
	const setCountGuildPage = useGuildStore(state => state.setCountPage);

	const [searchParams] = useSearchParams();

	const navigate = useNavigate();

	const newsPageParams = searchParams.get('news') || 1;
	const guildPageParams = searchParams.get('guild') || 1;

	const [isPending, setIsPending] = useState<boolean | null>(null);
	const [isPendingNews, setIsPendingNews] = useState<boolean | null>(null);
	const [isPendingOrders, setIsPendingOrders] = useState(false);

	const [isOpen, setIsOpen] = useState(false);
	const [isFormAdd, setIsFormAdd] = useState<boolean | null>(null);

	const [addNewsData, setAddNewsData] = useState<newsRequestDto>({
		title: '',
		content: '',
	});
	const [selectedImage, setSelectedImage] = useState<File | null>(null);
	const [addGuildData, setAddGuildData] = useState({
		header: '',
		message: '',
		pseudonym: '',
	});

	const [previewImage, setPreviewImage] = useState('');
	const [errorMessage, setErrorMessage] = useState('');

	// Проверка на роль. Если пользователь не админ, то его отправляет на главную страницу
	useEffect(() => {
		if (userRoles.length === 0) {
			setIsPending(true);
			const getUserData = async () => {
				const response = await getImage();
				setUserRoles(response.data.roles);
				if (!response.data.roles.includes(UserRoles.ADMIN)) {
					navigate('/');
					return;
				}
				setIsPending(false);
			};
			getUserData();
		}
	}, []);

	// Получение новостей
	useEffect(() => {
		setNewsList([]);
		setIsPendingNews(true);
		const fetchData = async () => {
			await getNews();
		};
		fetchData().then(() => {
			setIsPendingNews(false);
		});
	}, [newsPageParams]);

	// Получение заказов
	useEffect(() => {
		setGuildOrders([]);
		setIsPendingOrders(true);
		const fetchData = async () => {
			await getGuildOrders();
		};
		fetchData().then(() => {
			setIsPendingOrders(false);
		});
	}, [guildPageParams]);

	const getNews = async () => {
		const response = await fetchNews(+newsPageParams);
		setNewsList(response.data.news);
		setCountNewsPage(response.data.countPage);
	};
	const getGuildOrders = async () => {
		const response = await fetchGuildOrders(+guildPageParams);
		setGuildOrders(response.data.guildOrders);
		setCountGuildPage(response.data.countPage);
	};

	const saveArticle = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		if (!selectedImage) {
			setErrorMessage('Отсутствует изображение')
			return
		}
		else if (selectedImage.type !== 'image/jpeg' && selectedImage.type !== 'image/png') {
			setErrorMessage('Неверный тип файла. Доступны: jpg, jpeg, png')
			return
		}
		const formData = new FormData();
		formData.append('title', addNewsData.title);
		formData.append('content', addNewsData.content);
		formData.append('image', selectedImage);
		await createNews(formData);
		try {
			alert('Новость успешно добавлена');
		} catch (error) {
			console.error(error);
			alert('Произошла ошибка, более подробная информация в консоли браузера')
		} finally {
			setIsOpen(false);
			setAddNewsData({
				title: '',
				content: '',
			});
			setSelectedImage(null);
			setPreviewImage('')
		}
	}
	const saveOrder = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		try {
			await createOrder(addGuildData)
			alert('Заказ успешно создан')
		} catch (error) {
			console.error(error);
			alert('Произошла ошибка, более подробная информация в консоли браузера')
		} finally {
			setIsOpen(false);
			setAddGuildData({
				header: '',
				message: '',
				pseudonym: '',
			})
		}
	}

	const openForm = (isForm: boolean) => {
		setIsOpen(true);
		setIsFormAdd(isForm);
	};

	const handleSelectImage = (event: ChangeEvent<HTMLInputElement>) => {
		if (event.currentTarget.files && event.currentTarget.files.length > 0) {
			const image = event.currentTarget.files[0];
			setSelectedImage(image);
			if (image) {
				const objectUrl = URL.createObjectURL(image);
				setPreviewImage(objectUrl);
			}
		}
	};
	const handleNewsInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setAddNewsData({
			...addNewsData,
			[event.target.name]: event.target.value,
		});
	};
	const handleGuildInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setAddGuildData({
			...addGuildData,
			[event.target.name]: event.target.value,
		});
	};

	return (
		<>
			{isPending ? (
				<section>
					<Loader />
					<p className={styles.loadScreenTitle}>
						Пожалуйста подождите загрузку данных
					</p>
				</section>
			) : (
				<div className={styles.container}>
					<Link to={'/'}>Вернуться на главную</Link>
					<section className={'relative'}>
						<h4>Секция для Новостей</h4>
						<button onClick={() => openForm(true)}>
							<i className={styles.icon}>
								<FontAwesomeIcon icon={faPlus} />
							</i>
						</button>
						<div className={newsStyles.articlesContainer}>
							{isPendingNews ? (
								<Loader />
							) : (
								<NewsList page={'admin'} news={newsList} />
							)}
						</div>
						<Pagination paramName={'news'} pageCounts={countNewsPage} />
					</section>
					<hr className={styles.separator} />
					<section className={'relative'}>
						<h4>Секция для Гильдий</h4>
						<button onClick={() => openForm(false)}>
							<i className={styles.icon}>
								<FontAwesomeIcon icon={faPlus} />
							</i>
						</button>
						<div className={'flex md:flex-row flex-col gap-3 pb-10'}>
							{isPendingOrders ? <Loader /> : <OrdersList />}
							<OrderInformation />
						</div>
						<Pagination paramName={'guild'} pageCounts={countGuildPage} />
					</section>
					<Modal
						isOpen={isOpen}
						setClose={setIsOpen}
						title={isFormAdd ? 'Добавление новости' : 'Добавление заказа'}
					>
						{isFormAdd ? (
							<form className={styles.form} onSubmit={saveArticle}>
								<InputField
									register={register}
									name={'title'}
									placeholder={'Заголовок новости'}
									value={addNewsData.title}
									onChange={handleNewsInputChange}
									required={true}
									minLength={3}
									maxLength={100}
								/>
								<textarea
									className={styles.input}
									onChange={handleNewsInputChange}
									placeholder={'Контент'}
									wrap={'hard'}
									name={'content'}
									value={addNewsData.content}
									required={true}
									minLength={8}
									maxLength={2000}
								/>
								{previewImage && <img src={previewImage} alt={'preview'} />}
								<input
									type={'file'}
									accept={'image/png, image/jpeg, image/jpg'}
									onChange={handleSelectImage}
								/>
								{errorMessage && <p className={'text-red-700'}>{errorMessage}</p>}
								<button className={styles.formButton}>Добавить</button>
							</form>
						) : (
							<form className={styles.form} onSubmit={saveOrder}>
								<InputField
									register={register}
									name={'header'}
									placeholder={'Заголовок заказа'}
									value={addGuildData.header}
									onChange={handleGuildInputChange}
									required={true}
									minLength={3}
									maxLength={50}
								/>
								<textarea
									className={styles.input}
									onChange={handleGuildInputChange}
									placeholder={'Сообщение заказа'}
									wrap={'hard'}
									name={'message'}
									value={addGuildData.message}
									required={true}
									minLength={8}
									maxLength={400}
								/>
								<InputField
									register={register}
									name={'pseudonym'}
									placeholder={'Псевдоним заказчика'}
									value={addGuildData.pseudonym}
									onChange={handleGuildInputChange}
									required={true}
									minLength={3}
									maxLength={30}
								/>
								{errorMessage && <p className={'text-red-600'}>{errorMessage}</p>}
								<button className={styles.formButton}>Добавить</button>
							</form>
						)}
					</Modal>
				</div>
			)}
		</>
	);
};

export default AdminPage;
