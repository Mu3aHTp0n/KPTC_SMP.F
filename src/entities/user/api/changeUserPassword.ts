import { $api } from '@app/api';
import { IChangePasswordResponse } from '@entities/user/model';

interface IPasswords {
	oldPassword: string;
	password: string;
	confirmPassword: string;
}

export const changeUserPassword = async (passwords: IPasswords) => {
	const response = await $api.put<IChangePasswordResponse>('profile/password', passwords)
	localStorage.removeItem('refreshToken')
	localStorage.setItem('refreshToken', response.data.refreshToken);
	localStorage.removeItem('accessToken')
	localStorage.setItem('accessToken', response.data.accessToken);
}