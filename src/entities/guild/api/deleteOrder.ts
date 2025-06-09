import { $api } from '@app/api';

export const deleteOrder = async (id: number) => {
	return await $api.delete(`/guild/order/${id}`);
}