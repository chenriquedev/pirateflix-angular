import { Component, inject, OnInit } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import { CommonModule } from '@angular/common';
import LocalStorage from '../../utils/localstorage.utils';
import { Media } from '../../model/imovie-and-serie';

@Component({
  selector: 'app-favorite',
  imports: [CardComponent, CommonModule],
  templateUrl: './favorite.component.html',
  styleUrl: './favorite.component.css'
})
export class FavoriteComponent implements OnInit {
  favorites!: Media[]
  localStorageService: LocalStorage<Media[]> = inject(LocalStorage)
  ngOnInit(): void {
    this.favorites = this.localStorageService.getItem("fav") || [] as Media[]
    console.log(this.favorites)
  }

}
