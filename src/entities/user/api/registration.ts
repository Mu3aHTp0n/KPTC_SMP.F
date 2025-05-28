import { $api } from '@app/api';

interface IReg {
	username: string;
	email: string;
	code: string
	password: string;
	confirmPassword: string
}

export const registration = async (regData: IReg) => {
	return await $api.post('/auth/registration', regData);
}