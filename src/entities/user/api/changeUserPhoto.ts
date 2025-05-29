import { $api } from '@app/api';

import { IImageResponseDto } from '@shared/model/IImageResponseDto';

export const changeUserPhoto = async (file: FormData) => {
	return await $api.put<IImageResponseDto>('/profile/image', file)
}