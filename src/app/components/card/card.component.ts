import { Component, Input, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { IMovieOrSerie } from '../../model/imovie-or-serie';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  imports: [CardModule, RouterModule, CommonModule],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Input() movieOrSerie!: IMovieOrSerie;
  poster_path!: string;

  ngOnInit(): void {
    this.poster_path = this.movieOrSerie.poster_path
      ? 'https://image.tmdb.org/t/p/w500' + this.movieOrSerie.poster_path
      : "";
  }
}
