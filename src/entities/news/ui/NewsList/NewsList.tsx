import React from 'react';
import Article from '@entities/news/ui/Article/ui/Article';
import { INewsList } from '@shared/model/INewsList';

export const NewsList: React.FC<INewsList> = ({ news }) => {
	return (
		<>
			{news?.map(article => {
				if (article.title.length >= 33) {
					article.title = article.title.substring(0, 32) + '...';
				}
				return (
					<Article
						key={article.id}
						id={article.id}
						title={article.title}
						datePublication={article.datePublication}
						preview={article.previewUrl}
					/>
				);
			})}
		</>
	);
};
