import { $api } from '@app/api';

export async function fetchNewsById(id: number) {
	return await $api.get(`/news/${id}`);
}
