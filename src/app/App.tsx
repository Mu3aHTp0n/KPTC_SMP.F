import { BrowserRouter, Route, Routes } from 'react-router-dom';

import MainPage from '../MainPage';
import ProfilePage from '../profile/ProfilePage';
import NewsDetailPage from '../pages/NewsDetailPage/NewsDetailPage';

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/*" element={<MainPage />} />
					<Route path="/news/:id" element={<NewsDetailPage />} />
					<Route path="/profile/*" element={<ProfilePage />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
