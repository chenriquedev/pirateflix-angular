import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../component/card/card.component';
import { PiratflixServiceService } from '../../service/piratflix.service';
import { IMovieOrSerie } from '../../model/imovie-or-serie';
import { IResponse } from '../../model/iresponse';

@Component({
  selector: 'app-home',
  imports: [CommonModule,CardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  moviesOrSeries: IMovieOrSerie[] = [];

  constructor(private apiService: PiratflixServiceService) {
    this.apiService.get<IResponse<IMovieOrSerie>>('').subscribe((response) => {
      this.moviesOrSeries = response.results;
    });
  }
}
