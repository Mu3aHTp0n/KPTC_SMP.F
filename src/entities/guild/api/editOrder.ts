import { $api } from '@app/api';
import { IOrder, IOrderRequestData } from '@entities/guild';

export const editOrder = async (id: number, order: IOrderRequestData) => {
	return await $api.put<IOrder>(`/guild/order/${id}`, order)
}