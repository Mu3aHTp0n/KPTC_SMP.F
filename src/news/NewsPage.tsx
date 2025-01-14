import '../article.css';

import Article from './Article';

export default function NewsPage() {
	const articles = [
		{
			id: 1,
			title: 'Кастория в Honkai Star Rail',
			datePublication: '01.01.2025',
		},
		{
			id: 2,
			title: 'Коллабориция HSR и Fate',
			datePublication: '02.01.2023',
			preview:
				'https://wotpack.ru/wp-content/uploads/2025/01/insayd-seyber-i-archera-dobavyat-v-hsr-v-ramkah-kollaboratsii-fatesn-335x220.jpg',
		},
		{
			id: 3,
			title: 'Промокоды со стрима Honkai: Star Rail 3.0',
			datePublication: '01.05.2024',
			preview:
				'https://wotpack.ru/wp-content/uploads/2025/01/photo_2024-12-31_06-24-41-335x220.jpg',
		},
		{
			id: 4,
			title: 'Анонс Мидея в версии 3.1',
			datePublication: '02.03.2025',
			preview:
				'https://wotpack.ru/wp-content/uploads/2024/12/midey-v-honkai-star-rail-335x220.jpg',
		},
		{
			id: 5,
			title: 'Подсчёт нефрита за патч 3.0',
			datePublication: '31.01.2020',
			preview:
				'https://wotpack.ru/wp-content/uploads/2025/01/podschet-zvezdnyh-nefritov-za-patch-3.0-v-honkai-star-rail-335x220.jpg',
		},
	];
	const articlesList = articles.map(article => {
		return (
			<Article
				key={article.id}
				title={article.title}
				datePublication={article.datePublication}
				preview={article.preview}
			/>
		);
	});

	return (
		<div className="bg-[#191919] min-h-[100vh] pt-8">
			<div className="articles__container container max-w-7xl mx-auto text-white grid grid-cols-3 grid-flow-row gap-8">
				{articlesList}
			</div>
		</div>
	);
}
