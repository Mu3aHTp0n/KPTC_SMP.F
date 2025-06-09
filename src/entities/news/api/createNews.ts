import { $api } from '@app/api';

import { INewsDetail } from '@entities/news/model/INewsDetail';

export const createNews = async (formData: FormData) => {
	return await $api.post<INewsDetail>('news', formData)
}

