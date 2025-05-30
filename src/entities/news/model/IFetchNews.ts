import { INewListItem } from './INewListItem';

export interface IFetchNews {
	news: INewListItem[];
	countPage: number;
}