import { Article } from './article.model';

export interface News {

	status: string,
	totalResults: number,
	articles: Array<Article>

}