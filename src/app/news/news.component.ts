import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Article, TopHeadlinesResponse } from 'angular-news-api';
import { Observable, Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  startWith,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs/operators';
import { slideInAnimation } from '../animations';
import { NewsService } from '../news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit, OnDestroy {
  public data$: Observable<TopHeadlinesResponse>;
  public isLoading: boolean = false;
  public color: string = '#f74062';
  public searchControl: FormControl = new FormControl();

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private newsService: NewsService, private router: Router) {}

  public ngOnInit() {
    localStorage.clear();

    this.data$ = this.searchControl.valueChanges.pipe(
      startWith(''),
      debounceTime(500),
      distinctUntilChanged(),
      takeUntil(this.destroy$),
      tap(() => (this.isLoading = true)),
      switchMap((val) => this.newsService.topHeadlines(val)),
      tap(() => (this.isLoading = false))
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  public goToDetails(article: Article) {
    localStorage.setItem('token', '1234');
    this.router.navigate(['/article'], { state: article });
  }
}
