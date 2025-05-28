export type Order = {
	id: number;
	header: string;
	message: string;
	pseudonym: string;
}

export type OrderListResponse = {
	guildOrders: Order[];
	countPage: number;
}