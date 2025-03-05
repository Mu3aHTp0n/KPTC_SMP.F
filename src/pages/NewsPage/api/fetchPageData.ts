import axios, { AxiosError } from 'axios';

const BACKEND_API = import.meta.env.VITE_BACKEND_HOST;

export async function fetchPageData(currentPage: string, pageNumber: number) {
	try {
		const response = await axios.get(
			`${BACKEND_API}/${currentPage === 'news' ? 'news' : 'guild/orders'}?page=${pageNumber}`,
		);
		return response.data;
	} catch (error) {
		if (error instanceof AxiosError) {
			if (error.response) {
				throw new Error(error.response.data);
			}
			if (error.request) {
				console.log(error.request);
				throw new Error('Запрос был отправлен, но ответ не получен.');
			} else {
				console.log('Error', error.message);
				throw new Error(error.message);
			}
		} else throw new Error('Упс... Неизвестная ошибка');
	}
}
