import { $api } from '@app/api';

interface IResponse {
	actionTicket: string;
}

export const sendConfirmationCode = async (code: string) => {
	return await $api.post<IResponse>('/email/confirmation-code/verify-current', {
		code: code,
	})
}