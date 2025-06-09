import { create } from 'zustand';
import { IOrder } from '@entities/guild';
import { devtools } from 'zustand/middleware';

interface IGuildStore {
	guildOrders: IOrder[]
	activeOrder: IOrder,
	countPage: number;

	setGuildOrders: (orders: IOrder[]) => void;
	changeOrder: (orderId: number, order: IOrder) => void;
	removeOrder: (orderId: number) => void;

	setActiveOrder: (order: IOrder) => void;

	setCountPage: (count: number) => void;
}

export const useGuildStore = create<IGuildStore>()(
	devtools((set, get) => ({
		guildOrders: [],
		activeOrder: {},
		countPage: 1,

		setGuildOrders: (orders) => set({ guildOrders: orders }),
		changeOrder: (orderId, orderData) => set(state => ({
			guildOrders: state.guildOrders.map(order => (
				order.id === orderId ? { ...order, ...orderData } : order
			))
		})),
		removeOrder: (orderId) => set({
			guildOrders: get().guildOrders.filter(order => order.id !== orderId),
		}),
		setActiveOrder: (order) => set({ activeOrder: order }),
		setCountPage: count => set({ countPage: count }),
	})),
);