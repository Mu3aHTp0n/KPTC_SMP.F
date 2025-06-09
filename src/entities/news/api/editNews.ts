import { $api } from '@app/api';

import { INewsDetail } from '@entities/news/model/INewsDetail';

interface INewsData {
	title: string;
	content: string;
}

export const editNews = async (id: number, newsData: INewsData) => {
  return await $api.put<INewsDetail>(`news/${id}`, newsData);
}