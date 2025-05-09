import { BrowserRouter, Route, Routes } from 'react-router-dom';

import MainPage from '@pages/MainPage/ui/MainPage';
import ProfilePage from '@pages/ProfilePage/ui/ProfilePage';
import NewsDetailPage from '@pages/NewsDetailPage/ui/NewsDetailPage';
import HomePage from '@pages/HomePage';
import NewsPage from '@pages/NewsPage/ui/NewsPage';
import GuildPage from '@pages/GuildPage';
import HowToPlayPage from '@pages/HowToPlayPage/ui/HowToPlayPage';
import { routes } from '@shared/constants/routes';
import { useEffect } from 'react';

const App = () => {
	useEffect(() => {
		console.log(
			`%c                                                  
%c   aHR0cHM6Ly9kaXNjb3JkLmdnLzlVOWNmN2NZRFI=       
%c    _  ______ _____ ____     ____  __  __ ____    
   | |/ /  _ \\_   _/ ___|   / ___||  \\/  |  _ \\   
   | ' /| |_) || || |   ____\\___ \\| |\\/| | |_) |  
   | . \\|  __/ | || |__|_____|__) | |  | |  __/   
   |_|\\_\\_|    |_| \\____|   |____/|_|  |_|_|      
                                                  
%c   aHR0cHM6Ly9kaXNjb3JkLmdnLzlVOWNmN2NZRFI=       
                                                  
   ---                                      ---   
%c   Если ты нашел какой-то баг или уязвимость на   
   сайте, или у тебя есть другой технический      
   вопрос, пиши сюда - kptcsmphost@gmail.com      
%c   ---                                      ---   
%c                                                  `,
			'font-size: 13px; background: #15151B; color: #8F8F94; border-radius: 16px 16px 0px 0px',
			'font-size: 13px; background: #15151B; color: #8F8F94',
			'font-size: 13px; background: #15151B; color: white',
			'font-size: 13px; background: #15151B; color: #8F8F94',
			'font-size: 13px; background: #15151B; color: white',
			'font-size: 13px; background: #15151B; color: #8F8F94',
			'font-size: 13px; background: #15151B; color: #8F8F94; border-radius: 0px 0px 16px 16px',
		);

	}, []);

	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<MainPage />}>
						<Route path='/' element={<HomePage />} />
						<Route path={routes.news} element={<NewsPage />} />
						<Route path={routes.guild} element={<GuildPage />} />
						<Route path='/how-to-play' element={<HowToPlayPage />} />
					</Route>
					<Route path={routes.news + '/:id'} element={<NewsDetailPage />} />
					<Route path={routes.profile + '/*'} element={<ProfilePage />} />
					{/*<Route path={"*"} element={}/>*/}
				</Routes>
			</BrowserRouter>
		</>
	);
};

export default App;
