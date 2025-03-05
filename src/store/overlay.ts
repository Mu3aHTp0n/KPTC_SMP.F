import { create } from "zustand";

interface IOverlay {
    isOpen: boolean,
    modalId: number,
    setModalId: (id: number) => void,
    setOpen: () => void,
    setClose: () => void
}

export const useOverlay = create<IOverlay>(set => ({
    isOpen: false,
    modalId: 0,
    setModalId: (id) => set({ modalId: id }),
    setOpen: () => set({ isOpen: true }),
    setClose: () => set({ isOpen: false })
}))