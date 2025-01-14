import { BrowserRouter, Route, Routes } from 'react-router-dom';

import ProfilePage from './profile/ProfilePage';
import MainPage from './MainPage';

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path='/*' element={<MainPage />}/>
					<Route path='/profile/*' element={<ProfilePage />}/>
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
