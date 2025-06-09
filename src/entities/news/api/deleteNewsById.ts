import { $api } from '@app/api';

export const deleteNewsById = async (id: number) => {
	return await $api.delete(`/news/${id}`)
}