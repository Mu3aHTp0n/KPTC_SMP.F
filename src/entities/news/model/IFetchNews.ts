import { INewsListItem } from './INewsListItem';

export interface IFetchNews {
	news: INewsListItem[];
	countPage: number;
}