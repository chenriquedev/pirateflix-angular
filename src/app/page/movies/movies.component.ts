import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CardComponent } from '../../component/card/card.component';
import { PiratflixServiceService } from '../../service/piratflix.service';
import { IResponse } from '../../model/iresponse';
import { IMovieOrSerie } from '../../model/imovie-or-serie';

@Component({
  selector: 'app-movies',
  imports: [CommonModule, CardComponent],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css'
})
export class MoviesComponent {
  movies: IMovieOrSerie[] = [];

  constructor(private apiService: PiratflixServiceService) {
      this.apiService.get<IResponse<IMovieOrSerie>>('/movie/day').subscribe((response) => {
        this.movies = response.results;
      });
    }
}
