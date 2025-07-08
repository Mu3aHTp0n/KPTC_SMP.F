import { Outlet } from 'react-router-dom';

import { HomeHeader } from '@shared/ui/HomeHeader';

export default function MainPage() {
	return (
		<>
			<HomeHeader />
			<Outlet/>
		</>
	);
}
