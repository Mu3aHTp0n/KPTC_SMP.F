import { create } from "zustand";

interface IUser {
    id: number,
    username: string,
    email: string,
    setId: (value: number) => void,
    setUsername: (value: string) => void,
    setEmail: (value: string) => void,
}

export const useUserStore = create<IUser>(set => ({
    id: 0,
    username: '',
    email: '',
    setId: (newId) => set({ id: newId }),
    setUsername: (username) => set({ username: username }),
    setEmail: (email) => set({ email: email }),
}))