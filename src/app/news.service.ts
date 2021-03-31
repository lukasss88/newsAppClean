import { Injectable } from '@angular/core';
import { NewsApiService, TopHeadlinesResponse } from 'angular-news-api';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
// import { NewsApiService } from 'angular-news-api';
// import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  constructor(private newsApiService: NewsApiService) {}

  /**
   * Consume the NewsApiService here, make sure
   * to set the language to 'en' english and built
   * in the search functionality using the 'q'
   * variable in API calls to news-api
   */

  topHeadlines(search: string = '') {
    return this.newsApiService.topHeadlines({
      language: 'en',
      q: search,
    });
  }
}
