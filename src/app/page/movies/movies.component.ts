import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import { PiratflixServiceService } from '../../service/piratflix.service';
import { IResponse } from '../../model/iresponse';
import { PaginatorComponent } from '../../components/paginator/paginator.component';
import { Params } from '../../model/params';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { Media } from '../../model/imovie-and-serie';

@Component({
  selector: 'app-movies',
  imports: [CommonModule, CardComponent, PaginatorComponent],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css',
})
export class MoviesComponent implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  piratflixService: PiratflixServiceService = inject(PiratflixServiceService);
  movies: Media[] = [];
  pageParam: Params = {};
  page!: number;

  fetchData(params?: Params): void {
    this.piratflixService
      .get<IResponse<Media>>('/trending/movie/day', { page: params?.page })
      .pipe(take(1))
      .subscribe((response) => {
        this.pageParam.page = this.page;
        this.pageParam.first = (this.page - 1) * response.results.length;
        this.pageParam.rows = response.results.length;
        this.pageParam.total_results = response.total_results;
        this.movies = response.results;
      });
  }

  changePage(params: Params): void {
    this.page = params.page!;
    this.fetchData({ page: params.page });
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: this.page },
      queryParamsHandling: 'merge',
    });
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.page = +params.get('page')! || 1;
      this.fetchData({ page: this.page });
    });
  }
}
