import { $api } from '@app/api';
import { OrderListResponse } from '@entities/guild';

export async function fetchGuildOrders(pageNumber: number) {
	return await $api.get<OrderListResponse>(`/guild/orders`, {
		params: {
			page: pageNumber,
		},
	});
}
