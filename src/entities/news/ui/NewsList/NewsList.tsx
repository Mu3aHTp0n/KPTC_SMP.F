import React from 'react';
import { Article } from '@entities/news/ui/Article';
import { INewsList } from '@shared/model/INewsList';

interface Props extends INewsList {
	page?: string;
}

export const NewsList: React.FC<Props> = ({ news, page = 'news' }) => {
	return (
		<>
			{news?.map(article => {
				return (
					<Article
						key={article.id}
						id={article.id}
						title={article.title}
						datePublication={article.datePublication}
						previewUrl={article.previewUrl}
						page={page}
					/>
				);
			})}
		</>
	);
};
