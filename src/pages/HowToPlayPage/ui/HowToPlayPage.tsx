import { DiscordWidget } from '@shared/ui/DiscordWidget';
import { Accordion } from '@shared/ui/Accordion';

import styles from './HowToPlay.module.scss';

export default function HowToPlayPage() {
	return (
		<div className='bg-[#191919] pt-8 text-white flex flex-col justify-center items-center'>
			<div className={styles.faqContainer}>
				<div className={styles.faqHeader}>
					<h1>⚡️ KPTC-SMP: ЧАВО ДЛЯ ВЫЖИВШИХ ⚡️</h1>
					<blockquote className={styles.quote}>
						❝ Здесь нет глупых вопросов. Есть только трупы тех, кто их задавал.
						❞
					</blockquote>
				</div>

				<Accordion title={'❓ Как зайти на сервер'}>
					<ul>
						<li>
							<strong>Регистрация:</strong> зарегистрироваться на этом сайте в
							качестве логина указав ник в «Майнкрафт» и пароль, который вы
							будете использовать на сервере.
						</li>
					</ul>
					<h4>
						<strong>Для Java:</strong>
					</h4>
					<ul>
						<li>
							<strong>IP:</strong> <code>kptc-smp.online</code> (вставь в
							"Мультиплеер")
						</li>
						<li>
							<strong>Версия:</strong> 1.21.4 (Желательно использовать Fabric)
						</li>
					</ul>
					<h4>
						<strong>Для Bedrock:</strong>
					</h4>
					<ul>
						<li>
							<strong>IP:</strong> <code>kptc-smp.online:25470</code> (вставь в
							"Мультиплеер")
						</li>
						<li>
							<strong>Версия:</strong> 1.21.50-1.21.80
						</li>
						<li>
							<strong>Важно:</strong> Если вы играли с Java-версии и потом заходите с Bedrock, есть шанс, что будет ошибка «You are not whitelisted on this server». Поэтому пробуйте, пока не зайдёт
						</li>
					</ul>
				</Accordion>

				<Accordion title={'❓ Как присоединиться к discord серверу'}>
					<div className={styles.discordContainer}>
						<DiscordWidget />
					</div>
				</Accordion>

				<Accordion title={'❓ Что за режим'}>
					<ul>
						<li>
							<strong>Жесткий role-play</strong>
						</li>
						<li>
							<strong>Нет</strong> приватов, /home и донатных преимуществ
						</li>
						<li>
							<strong>Есть</strong> ваша фантазия
						</li>
					</ul>
				</Accordion>

				<Accordion title={'❓ Какие моды нужны'}>
					<p>
						<strong>Обязательно:</strong>
					</p>
					<ul>
						<li>Voice Chat (для переговоров с союзниками)</li>
						<li>EmoteCraft (для эмоций)</li>
						<li>
							Sound physics remastered (объемный звук + возможность слышать
							custom discs)
						</li>
					</ul>
					<p>
						<strong>Сборки:</strong>
					</p>
					<ul>
						<li>
							<a
								href={
									'https://drive.google.com/file/d/1GNHSR2cAVMYkx9lCp_ZxhYBOvPou21cE/view?usp=sharing'
								}
							>
								Минимальная сборка
							</a>
						</li>
						<li>
							<a
								href={
									'https://drive.google.com/file/d/1oc3HVRnvbZyKv662wPewr00M7b6BWnwi/view?usp=sharing'
								}
							>
								Сборка от админов
							</a>
						</li>
					</ul>
				</Accordion>

				<Accordion title={'❓ Как установить скины'}>
					<ul>
						<li>
							Если используете сторонний лаунчер, отключите встроенные скины
						</li>
						<li>
							Зайдите на сервер и пропишите следующую команду:
							<br />
							<code>/skin set "ссылка(imgur) или ник лиц.майнкрафта"</code>
						</li>
						<li>
							Если используете лицензию, то можете менять скин с помощью мода{' '}
							<strong>Skin Shuffle</strong>
						</li>
					</ul>
				</Accordion>

				<Accordion title={'❓ Как добавить свою музыку на сервер'}>
					<ol className={'list-[auto]'}>
						<li>
							Написать в специально выделенный канал сообщение, содержащее
							ютуб-ссылку на музыку
						</li>
						<li>
							Получить одобрение со стороны администрации на добавления трека
						</li>
						<li>Дождаться ответа администрации о добавлении трека</li>
						<li>
							Зайти на сервер, взять в руки музыкальный диск (любой), прописать
							следующую команду:
							<br />
							<code>/cd create *название.mp3* *название диска*</code>
						</li>
					</ol>
				</Accordion>

				<Accordion title={'❓ Что за админы'}>
					<ul>
						<li>Админы отвечают в "вопрос-ответ"</li>
						<li>Не возвращают вещи после смерти (это не детсад)</li>
						<li>
							Банят <strong>только</strong> за читы, лаг-машины, гриферство и
							оскорбление мамы админа
						</li>
					</ul>
				</Accordion>

				<Accordion title={'❓ Как пропустить ночь на сервере'}>
					<ul>
						<li>Нужно чтобы спало более 50% игроков на сервере</li>
					</ul>
				</Accordion>

				<Accordion
					title={'❓ Что за сообщения появляются на сервере от Discord'}
				>
					<ul>
						<li>
							Эти сообщения приходят с текстового канала
							"〖✍〗майнкрафт-дискорд "
						</li>
						<li>
							Он позволяет отправлять сообщения с discord в minecraft и из
							minecraft в discord
						</li>
					</ul>
				</Accordion>

				<hr className={styles.divider} />
				<div className={styles.warning}>
					<p>
						💀 <strong>Последнее предупреждение:</strong>
					</p>
					<p>
						<em>"Если ты спрашиваешь 'как играть?' — тебе уже не помочь."</em>
					</p>
				</div>
			</div>
		</div>
	);
}
