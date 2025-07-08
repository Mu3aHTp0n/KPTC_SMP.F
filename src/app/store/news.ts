import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { INewsDetail, INewsListItem } from '@entities/news';

interface INewsStore {
	newsList: INewsDetail[]
	countPage: number;

	setNewsList: (news: INewsListItem[]) => void;
	changeArticle: (articleId: number, articleData: INewsDetail) => void;
	changePreview: (articleId: number, newUrl: string) => void;
	removeArticle: (articleId: number) => void;
	setCountPage: (count: number) => void;
}

export const useNewsStore = create<INewsStore>()(
	devtools((set, get) => ({
		newsList: [],
		countPage: 1,

		setNewsList: (news) => set({ newsList: news }),
		changeArticle: (articleId, articleData) => set(state => ({
			newsList: state.newsList.map(article =>
				article.id === articleId ? {...article, ...articleData} : article
			),
		})),
		changePreview: (articleId, newUrl) => set(state => ({
			newsList: state.newsList.map(article =>
				article.id === articleId ? {...article, previewUrl: newUrl} : article
			),
		})),
		removeArticle: (articleId: number) => set({
			newsList: get().newsList.filter(article => article.id !== articleId),
		}),
		setCountPage: count => set({ countPage: count }),
	})),
);