import { $api } from '@app/api';

import { INewsDetail } from '@entities/news/model/INewsDetail';

export async function fetchNewsById(id: number) {
	return await $api.get<INewsDetail>(`/news/${id}`);
}
