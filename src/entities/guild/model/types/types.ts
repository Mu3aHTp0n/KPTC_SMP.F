export interface IOrder {
	id: number;
	header: string;
	message: string;
	pseudonym: string;
}

export type IOrderRequestData = Omit<IOrder, 'id'>

export interface IOrderListResponse {
	guildOrders: IOrder[];
	countPage: number;
}