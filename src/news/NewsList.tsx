import Article from "./Article";

interface IArticle {
	newsList: {
		id: number,
		title: string,
		datePublication: string,
		photoName: string,
	}[]
}

export default function NewsList({newsList}: IArticle) {
	const BACKEND_API = import.meta.env.VITE_BACKEND_HOST

	const articlesList = newsList.map(article => {
		return (
			<Article
				key={article.id}
				id={article.id}
				title={article.title}
				datePublication={article.datePublication}
				preview={`${BACKEND_API}/news/${article.id}/resource?imageName=${article.photoName}`}
			/>
		);
	});

	return (
		<>
			{articlesList}
		</>
	);
}
