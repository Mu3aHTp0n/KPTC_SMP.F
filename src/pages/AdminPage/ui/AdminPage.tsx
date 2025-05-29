import { useEffect, useState } from 'react';
import { useUserStore } from '@app/store/user';

import { getImage } from '@entities/user';

import Loader from '@shared/ui/Loader/Loader';

import { UserRoles } from '@entities/user/constants';
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
	const userRoles = useUserStore(state => state.roles);
	const setUserRoles = useUserStore(state => state.setRoles);

	const [isPending, setIsPending] = useState<boolean | null>(null);

	const navigate = useNavigate();

	useEffect(() => {
		if (userRoles.length === 0) {
			setIsPending(true);
			const getUserData = async () => {
				const response = await getImage();
				setUserRoles(response.data.roles);
				if (!response.data.roles.includes(UserRoles.ADMIN)) {
					navigate('/');
					return;
				}
				setIsPending(false);
			};
			getUserData();
		}
	}, []);

	return isPending ? (
		<section>
			<Loader />
			<p>Пожалуйста подождите загрузку данных</p>
		</section>
	) : (
		<div>
			<p>Админка</p>
		</div>
	);
};

export default AdminPage;
