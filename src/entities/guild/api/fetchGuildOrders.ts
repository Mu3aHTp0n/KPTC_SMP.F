import { $api } from '@app/api';

import { IOrderListResponse } from '@entities/guild';

export async function fetchGuildOrders(pageNumber: number) {
	if (pageNumber < 1) pageNumber = 1;
	return await $api.get<IOrderListResponse>(`/guild/orders`, {
		params: {
			page: pageNumber,
		},
	});
}
