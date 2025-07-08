import { $api } from '@app/api';

interface IRefreshToken {
	refreshToken: string;
	accessToken: string;
}

export const refreshToken = async () => {
	const response = await $api.post<IRefreshToken>('/auth/refresh-token', {
		refreshToken: localStorage.getItem('refreshToken'),
	});
	localStorage.setItem('refreshToken', response.data.refreshToken);
	localStorage.setItem('accessToken', response.data.accessToken);
	return response;
};
