import { $api } from '@app/api';
import { IFetchNews } from '@entities/news/model';

export async function fetchNews(pageNumber: number) {
	return await $api.get<IFetchNews>(`/news`, {
		params: {
			page: pageNumber,
		},
	});
}
