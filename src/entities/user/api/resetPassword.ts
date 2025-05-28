import { $api } from '@app/api';

interface IParameter {
	password: string;
	confirmPassword: string;
}

interface IResponse {
	message: string;
}

export const resetPassword = async (newPass: IParameter, uuid: string) => {
	return await $api.put<IResponse>('/auth/password-reset', newPass, {
		params: {
			uuid: uuid
		}
	});
}