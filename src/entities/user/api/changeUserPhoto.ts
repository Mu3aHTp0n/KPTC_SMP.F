import { $api } from '@app/api';

export const changeUserPhoto = async (file: FormData) => {
	return await $api.put('/profile/image', file)
}