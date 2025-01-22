import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../components/card/card.component';
import { PiratflixServiceService } from '../../service/piratflix.service';
import { IResponse } from '../../model/iresponse';
import { ActivatedRoute, Router } from '@angular/router';
import { Params } from '../../model/params';
import { PaginatorComponent } from '../../components/paginator/paginator.component';
import { take } from 'rxjs';
import { Media } from '../../model/imovie-and-serie';

@Component({
  selector: 'app-home',
  imports: [CommonModule, CardComponent, PaginatorComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit{

  route: ActivatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  piratflixService: PiratflixServiceService = inject(PiratflixServiceService);
  moviesOrSeries: Media[] = [];
  pageParam: Params = {};
  page!: number;

  fetchData(params?: Params): void {
    this.piratflixService
      .get<IResponse<Media>>('/trending/all/day', { page: params?.page })
      .pipe(take(1))
      .subscribe((response) => {
        this.pageParam.page = this.page;
        this.pageParam.first = (this.page - 1) * response.results.length;
        this.pageParam.rows = response.results.length;
        this.pageParam.total_results = response.total_results;
        this.moviesOrSeries = response.results;
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
