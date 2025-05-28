import { $api } from '@app/api';
import { UserData } from '@entities/user/model/UserData';


export const fetchUserData = async () => {
	return await $api.get<UserData>('/profile/account-details');
};
