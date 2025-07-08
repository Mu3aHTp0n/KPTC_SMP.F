import { $api } from '@app/api';

interface INewEmailData {
	email: string;
	code: string;
	actionTicket: string;
}

export const changeUserEmail = async (newEmailData: INewEmailData): Promise<void> => {
	return await $api.put('/profile/email', newEmailData);
}