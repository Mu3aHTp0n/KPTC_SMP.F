import { $api } from '@app/api';

import { IOrder } from '@entities/guild';
import { IOrderRequestData } from '@entities/guild';

export const createOrder = async (order: IOrderRequestData) => {
	return await $api.post<IOrder>('/guild/order', order)
}