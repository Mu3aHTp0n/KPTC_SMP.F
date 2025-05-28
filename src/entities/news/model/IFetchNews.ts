import { IArticle } from './IArticle';

export interface IFetchNews {
	news: IArticle[];
	countPage: number;
}