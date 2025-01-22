import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Rating } from 'primeng/rating';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-rating',
  imports: [Rating, FormsModule],
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.css',
  encapsulation: ViewEncapsulation.None
})
export class RatingComponent{
  @Input() activeStars!: number;
}
