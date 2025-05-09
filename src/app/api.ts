import axios, { AxiosError, AxiosResponse } from 'axios';
import { refreshToken } from '@entities/user/api/refreshToken';

export const $api = axios.create({
	baseURL: import.meta.env.VITE_BACKEND_HOST,
	headers: {
		'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
	}
})

$api.interceptors.response.use(
	(response: AxiosResponse) => response,
	async (error: AxiosError) => {
		if (error instanceof AxiosError) {
			if (error.message === 'Network Error') {
					await refreshToken();
					$api.defaults.headers['Authorization'] = 'Bearer ' + localStorage.getItem('accessToken');
			}
			if (error.response) {
				if (error.response.status === 401) {
				}
				console.error('Ошибка сервера: ', error.response.data);
				return Promise.reject(error.response.data);
			} else if (error.request) {
				console.error('Нет ответа от сервера: ', error.request);
				return Promise.reject('Нет ответа от сервера, проверьте подключение к интернету');
			}
		} else {
			return Promise.reject('Произошла неизвестная ошибка');
		}
	}
)