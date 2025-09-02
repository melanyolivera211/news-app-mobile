import { Component, OnInit } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { News as NewsService } from '@core/services/http/news/news';
import { Loader as LoaderService } from '@shared/services/loader/loader';
import { Toast as ToastService } from '@shared/services/toast/toast';

import { Category as CategoryService } from '@core/services/storage/category/category';

import { News } from '@models/news.model';
import { Article } from '@models/article.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  public currentCategory$: Observable<string> =
    this.categoryService.currentCategory$;

  public news!: News;
  public main!: Article;

  public constructor(
    private loaderService: LoaderService,
    private toastService: ToastService,
    private newsService: NewsService,
    private categoryService: CategoryService
  ) {
    this.currentCategory$.subscribe({
      next: (t) => {
        this.newsService.setCategory(t);
        this.loadNews();
      },
      error: (e) => this.toastService.showError(e.message),
    });
  }

  public ngOnInit(): void {
    this.loadNews();
  }

  private async loadNews(): Promise<void> {
    this.loaderService.show();

    try {
      const newsResponse: HttpResponse<News> = await this.newsService.findAll();

      const news: News | null = newsResponse.body;

      if (news) {
        this.news = news;

        const main = news.articles.reverse().pop();

        if (main) this.main = main;
      } else {
        throw new Error('Unnable to fetch data');
      }
    } catch (e: any) {
      this.toastService.showError(e.message);
    } finally {
      this.loaderService.hide();
    }
  }
}
