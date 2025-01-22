import { Component, Input, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Media } from '../../model/imovie-and-serie';

@Component({
  selector: 'app-card',
  imports: [CardModule, RouterModule, CommonModule],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Input() movieOrSerie!: Media;
  poster_path!: string;

  ngOnInit(): void {
    this.poster_path = this.movieOrSerie.poster_path
      ? 'https://image.tmdb.org/t/p/w500' + this.movieOrSerie.poster_path
      : '';
  }
}
