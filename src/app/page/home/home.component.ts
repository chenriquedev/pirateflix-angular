import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../components/card/card.component';
import { PiratflixServiceService } from '../../service/piratflix.service';
import { IMovieOrSerie } from '../../model/imovie-or-serie';
import { IResponse } from '../../model/iresponse';
import { ActivatedRoute, Router } from '@angular/router';
import { Params } from '../../model/params';
import { PaginatorComponent } from '../../components/paginator/paginator.component';

@Component({
  selector: 'app-home',
  imports: [CommonModule, CardComponent, PaginatorComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  piratflixService: PiratflixServiceService = inject(PiratflixServiceService);
  moviesOrSeries: IMovieOrSerie[] = [];
  pageParam: Params = {};
  page!: number;

  fetchData(params?: Params) {
    this.piratflixService
      .get<IResponse<IMovieOrSerie>>('/all/day', { page: params?.page })
      .subscribe((response) => {
        this.pageParam.page = this.page;
        this.pageParam.first = (this.page - 1) * response.results.length;
        this.pageParam.rows = response.results.length;
        this.pageParam.total_results = response.total_results;
        this.moviesOrSeries = response.results;
      });
  }

  changePage(params: Params) {
    this.page = params.page!;
    this.fetchData({ page: params.page });
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: this.page },
      queryParamsHandling: 'merge',
    });
  }

  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      this.page = +params.get('page')! || 1;
      this.fetchData({ page: this.page });
    });
  }
}
