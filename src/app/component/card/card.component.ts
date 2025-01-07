import { Component, Input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { IMovieOrSerie } from '../../model/imovie-or-serie';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-card',
  imports: [CardModule, RouterModule],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent {
  @Input() movieOrSerie!: IMovieOrSerie;
}
