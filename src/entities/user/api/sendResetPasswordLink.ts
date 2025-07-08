import { $api } from '@app/api';

interface IResponse {
	message: string;
}

export const sendResetPasswordLink = async (email: string) => {
	return await $api.post<IResponse>('/auth/password-forgot', { email: email })
}