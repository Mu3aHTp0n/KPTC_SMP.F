import { $api } from '@app/api';
import { IUserDataResponse } from '@entities/user/model/IUserDataResponse';

export const getImage = async () => {
	return await $api.get<IUserDataResponse>(`/profile/user-profile`);
};