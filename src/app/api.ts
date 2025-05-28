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
		const originalRequest = error.config;
		if (error instanceof AxiosError) {
			if (!error.response && error.config && !error.config.isRetry) {
				originalRequest.isRetry = true
				try {
					const response = await refreshToken();
					originalRequest.headers.set('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
					$api.defaults.headers['Authorization'] = 'Bearer ' + response.data.accessToken;
					return $api.request(originalRequest);
				} catch (e) {
					console.error('Пользователь не авторизован и/или ' + e);
				}
			}
			if (error.response) {
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