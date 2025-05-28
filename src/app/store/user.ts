import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface IUser {
	id: number;
	username: string;
	email: string;
	registrationDate: string;
	imageUrl: string;

	setId: (value: number) => void;
	setUsername: (value: string) => void;
	setEmail: (value: string) => void;
	setRegistrationDate: (value: string) => void;
	setImageUrl: (value: string) => void;
}

export const useUserStore = create<IUser>()(
	devtools(set => ({
	id: 0,
	username: '',
	email: '',
	registrationDate: '',
	imageUrl: '',

	setId: newId => set({ id: newId }),
	setUsername: username => set({ username: username }),
	setEmail: email => set({ email: email }),
	setRegistrationDate: registrationDate =>
		set({ registrationDate: registrationDate }),
	setImageUrl: url => set({ imageUrl: url }),
})));
