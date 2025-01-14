import { create } from "zustand";

interface IUser {
    nickname: string,
    email: string,
    dateReg: string
}

export const useUser = create<IUser>(set => ({
    nickname: '',
    email: '',
    dateReg: '',
    setNickname: (value: string) => set({ nickname: value }),
    setEmail: (value: string) => set({ email: value }),
    setDateReg: (value: string) => set({ dateReg: value }),
}))