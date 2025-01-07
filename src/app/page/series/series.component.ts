import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CardComponent } from '../../component/card/card.component';
import { IMovieOrSerie } from '../../model/imovie-or-serie';
import { PiratflixServiceService } from '../../service/piratflix.service';
import { IResponse } from '../../model/iresponse';

@Component({
  selector: 'app-series',
  imports: [CommonModule, CardComponent],
  templateUrl: './series.component.html',
  styleUrl: './series.component.css',
})
export class SeriesComponent {
  series: IMovieOrSerie[] = [];

  constructor(private apiService: PiratflixServiceService) {
    this.apiService.get<IResponse<IMovieOrSerie>>('tv/day').subscribe((result) => {
      this.series = result.results;
    });
  }
}
