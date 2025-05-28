import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { SetNewPasswordModal } from '@entities/user/ui/SetNewPasswordModal';
import MainPage from '@pages/MainPage/ui/MainPage';
import AdminPage from '@pages/AdminPage';
import ProfilePage from '@pages/ProfilePage/ui/ProfilePage';
import HomePage from '@pages/HomePage';
import NewsPage from '@pages/NewsPage/ui/NewsPage';
import GuildPage from '@pages/GuildPage';
import HowToPlayPage from '@pages/HowToPlayPage/ui/HowToPlayPage';
import NewsDetailPage from '@pages/NewsDetailPage/ui/NewsDetailPage';
import NotFound from '@pages/NotFound';

import Modal from '@shared/ui/Modal/ui/Modal';

import { ROUTES } from '@shared/constants/routes';

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
						<Route path={'/'} element={<HomePage />} >
							<Route path={'/password-reset'} element={<Modal title={'Смена пароля'} isOpen={true} setClose={() => null}><SetNewPasswordModal/></Modal>}/>
						</Route>
						<Route path={ROUTES.news} element={<NewsPage />} />
						<Route path={ROUTES.guild} element={<GuildPage />} />
						<Route path={ROUTES.howToPlay} element={<HowToPlayPage />} />
					</Route>
					<Route path={ROUTES.news + '/:id'} element={<NewsDetailPage />} />
					<Route path={ROUTES.profile + '/*'} element={<ProfilePage />} />
					<Route path={ROUTES.admin} element={<AdminPage />}/>
					<Route path={"*"} element={<NotFound />}/>
				</Routes>
			</BrowserRouter>
		</>
	);
};

export default App;
