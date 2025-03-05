import { Route, Routes } from 'react-router-dom';

import MainHeader from '@widgets/MainHeader';
import HomePage from './home/HomePage';
import NewsPage from '@pages/NewsPage/NewsPage';
import GuildPage from '@pages/GuildPage/GuildPage';
import HowToPlayPage from '@pages/HowToPlayPage/HowToPlayPage';

export default function MainPage() {
	return (
		<>
			<MainHeader />
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/news" element={<NewsPage />} />
				<Route path="/guild" element={<GuildPage />} />
				<Route path="/how-to-play" element={<HowToPlayPage />} />
			</Routes>
		</>
	);
}
