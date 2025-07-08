import { useGuildStore } from '@app/store/guild';

import cn from 'classnames';

import quest from '@shared/assets/quest.png';

import styles from './OrderList.module.scss'

export const OrdersList = () => {
	const guildOrders = useGuildStore(state => state.guildOrders)
	const activeOrder = useGuildStore(state => state.activeOrder);
	const setActiveOrder = useGuildStore(state => state.setActiveOrder)

	return (
		<div
			className={styles.orderContainer}>
			{guildOrders?.map(order => {
				return (
					<img
						className={cn(styles.orderImage, {[styles['activeOrder']]: activeOrder.id === order.id})}
						key={order.id}
						title={order.header}
						onClick={() => setActiveOrder(order)}
						src={quest}
						alt='Quest'
					/>
				);
			})}
		</div>
	);
};