import { $api } from '@app/api';
import { IFetchNews } from '@entities/news/model';

export async function fetchNews(pageNumber: number) {
	if (pageNumber < 1) pageNumber = 1;
	return await $api.get<IFetchNews>(`/news`, {
		params: {
			page: pageNumber,
		},
	});
}
