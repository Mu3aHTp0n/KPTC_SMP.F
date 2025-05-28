import { $api } from '@app/api';

interface IResponse {
	message: string;
}

export const sendCurrentEmailCode = async (email: string) => {
	return await $api.post<IResponse>('email/confirmation-code/current', {
		email: email,
	});
};
