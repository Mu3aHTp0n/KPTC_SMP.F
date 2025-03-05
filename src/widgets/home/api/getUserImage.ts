import axios from 'axios';

const BACKEND_API = import.meta.env.VITE_BACKEND_HOST;

export const getImageName = async () => {
	const response = await axios.get(`${BACKEND_API}/profile/image-name`, {
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
		},
	});
	return response.data.message;
};

async function blobToBase64(blob) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onloadend = () => resolve(reader.result);
		reader.onerror = reject;
		reader.readAsDataURL(blob);
	});
}

export const getImage = async (imageName: string) => {
	const response = await axios.get(
		`${BACKEND_API}/profile/resource?imageName=${imageName}`,
		{
			headers: {
				Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
			},
		},
	);
	const blob = new Blob([response.data], {
		type: response.headers['content-type'],
	});
	return await blobToBase64(blob);
};
