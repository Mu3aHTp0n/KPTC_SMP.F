import { $api } from '@app/api';

import { IImageResponseDto } from '@shared/model/IImageResponseDto';

export const editNewsPreview = async (id: number, file: FormData) => {
	return await $api.put<IImageResponseDto>(`/news/${id}/preview`, file)
}