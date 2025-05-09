import { $api } from '@app/api';

export const changeUserPhoto = async (file) => {
	return await $api.put('/profile/image', file)
}