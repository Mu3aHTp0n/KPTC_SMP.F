import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useGuildStore } from '@app/store/guild';
import { useForm } from 'react-hook-form';

import { deleteOrder } from '@entities/guild';
import { editOrder } from '@entities/guild';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons/faPenToSquare';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons/faTrashCan';

import Loader from '@shared/ui/Loader/Loader';
import InputField from '@shared/ui/InputField/ui/InputField';

import styles from './OrderInformation.module.scss';

export const OrderInformation = () => {
	const { register } = useForm();

	const activeOrder = useGuildStore(state => state.activeOrder);
	const removeOrder = useGuildStore(state => state.removeOrder);
	const setActiveOrder = useGuildStore(state => state.setActiveOrder);
	const changeOrder = useGuildStore(state => state.changeOrder);

	const [orderData, setOrderData] = useState({
		header: activeOrder.header,
		message: activeOrder.message,
		pseudonym: activeOrder.pseudonym
	});
	const [isDeletePending, setIsDeletePending] = useState(false);
	const [isChangesPending, setIsChangesPending] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	// const [errorMessage, setErrorMessage] = useState('');

	useEffect(() => {
		setOrderData({})
		setOrderData(activeOrder)
	},[activeOrder])

	const deleteCurrentOrder = async () => {
		const isAlready = confirm('Вы уверены что хотите удалить эту новость?');
		if (!isAlready) return;
		setIsDeletePending(true);
		await deleteOrder(activeOrder.id);
		removeOrder(activeOrder.id);
		setActiveOrder({});
		setOrderData({});
		setIsDeletePending(false);
		alert(`Задание "${activeOrder.header}" успешно удалено`);
	};

	const saveChanges = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setIsChangesPending(true);
		try {
			const response = await editOrder(activeOrder.id, orderData);
			setActiveOrder(response.data)
			changeOrder(response.data.id, response.data)
		} catch (error) {
			// setErrorMessage(error.message);
		} finally {
			setIsChangesPending(false)
		}
	}

	const changeEditingStatus = () => {
		setIsEditing(prev => !prev);
	};

	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		setOrderData({
			...orderData,
			[event.target.name]: event.target.value,
		});
	};

	return (
		<div className={styles.orderContainer}>
			{isEditing ? (
				<form className={styles.orderForm} onSubmit={saveChanges}>
					<InputField
						register={register}
						placeholder={'Заголовок'}
						name={'header'}
						value={orderData.header}
						minLength={3}
						maxLength={50}
						required={true}
						onChange={handleInputChange}
					/>
					<InputField
						register={register}
						placeholder={'Подробное описание задания'}
						name={'message'}
						value={orderData.message}
						minLength={8}
						maxLength={400}
						required={true}
						onChange={handleInputChange}
					/>
					<InputField
						register={register}
						placeholder={'Заказчик'}
						name={'pseudonym'}
						value={orderData.pseudonym}
						minLength={3}
						maxLength={30}
						required={true}
						onChange={handleInputChange}
					/>
					<button type={'submit'}>Save</button>
				</form>
			) : (
				<div>
					<h3 className={styles.orderTitle}>{activeOrder?.header}</h3>
					<p className={styles.orderContent}>{activeOrder?.message}</p>
					<p className={styles.orderAuthor}>{activeOrder?.pseudonym}</p>
				</div>
			)}
			{(!!activeOrder.id && location.pathname === '/admin') && (
				<div className={styles.action}>
					<button onClick={changeEditingStatus}>
						<i>
							<FontAwesomeIcon icon={faPenToSquare} />
							{isChangesPending && <Loader/>}
						</i>
					</button>
					<button onClick={deleteCurrentOrder}>
						<i>
							<FontAwesomeIcon icon={faTrashCan} />
							{isDeletePending && <Loader />}
						</i>
					</button>
				</div>
			)}
		</div>
	);
};
