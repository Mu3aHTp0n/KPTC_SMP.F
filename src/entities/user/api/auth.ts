import { $api } from '@app/api';
import { ILoginResponse } from '@entities/user/model/ILoginResponse';

interface IAuth {
	username: string;
	password: string;
}

export const auth = async (authData: IAuth) => {
	return await $api.post<ILoginResponse>('/auth/login', authData);
}