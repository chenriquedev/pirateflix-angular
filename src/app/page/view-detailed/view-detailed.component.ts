import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { Media } from '../../model/imovie-and-serie';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RatingComponent } from '../../components/rating/rating.component';
import { IframeComponent } from '../../components/iframe/iframe.component';
import { ButtonComponent } from '../../components/button/button.component';
import { ViewDetailedService } from './view-detailed.service';
import { take } from 'rxjs';
import LocalStorage from '../../utils/localstorage.utils';

@Component({
  selector: 'app-view-detailed',
  imports: [CommonModule, RatingComponent, IframeComponent, ButtonComponent],
  templateUrl: './view-detailed.component.html',
  styleUrls: ['./view-detailed.component.css'],
})
export class ViewDetailedComponent implements OnInit {
  mediaContent: Media = {} as Media;
  route: ActivatedRoute = inject(ActivatedRoute);
  viewDetailedService: ViewDetailedService = inject(ViewDetailedService);
  localStorageService: LocalStorage<Media[]> = inject(LocalStorage);
  mediaType!: string;
  mediaId!: string;
  poster_path!: string;
  backdrop_path!: string;
  activeStars!: number;
  releaseYear!: string;
  runtime!: number | null;
  time_per_episode!: number | null;
  videoKey!: string;
  mediaFavorites: Media[] = [];
  isFavorite: boolean = false;

  fetchMediaDetails(type: string, id: string): void {
    this.viewDetailedService.getMediaContent(type, id).subscribe((response) => {
      this.mediaContent = response;
      this.mediaContent.media_type = this.mediaType;
      this.poster_path = response.poster_path
        ? 'https://image.tmdb.org/t/p/w500' + response.poster_path
        : '';
      this.backdrop_path = response.backdrop_path
        ? 'https://image.tmdb.org/t/p/original/' + response.backdrop_path
        : '';
      this.activeStars = this.transformRating(response.vote_average);
      this.releaseYear = this.extractReleaseYear(response);
      this.getRuntime(response);
      this.fetchKeyMediaVideo(this.mediaType, this.mediaId);
      this.manageFavorite();
    });
  }

  fetchKeyMediaVideo(type: string, id: string): void {
    this.viewDetailedService
      .getVideo(type, id)
      .pipe(take(1))
      .subscribe((response) => {
        const videoInfo = response.results.find(
          (video: any) => video.type === 'Trailer'
        );

        this.videoKey = videoInfo ? videoInfo.key : '';
      });
  }

  transformRating(rating: number): number {
    const ratingConverted = this.convertToHalfScale(rating);
    return this.roundRating(ratingConverted);
  }

  convertToHalfScale(rating: number): number {
    return rating / 2;
  }

  roundRating(rating: number): number {
    return Math.round(rating);
  }

  extractReleaseYear(media: Media): string {
    return this.mediaType === 'movie'
      ? this.extractYearFromDate(media.release_date)
      : this.extractYearFromDate(media.first_air_date);
  }

  extractYearFromDate(releaseDate: string): string {
    return releaseDate.split('-')[0];
  }

  getRuntime(media: Media): void {
    this.mediaType === 'movie'
      ? (this.runtime = media.runtime)
      : (this.time_per_episode = media.episode_run_time?.[0] ?? null);
  }

  manageFavorite() {
    this.getFavoriteMedia();
    this.checkIsFavorite();
  }

  getFavoriteMedia(): void {
    this.mediaFavorites = this.localStorageService.getItem('fav') || [];
  }

  checkIsFavorite(): void {
    this.isFavorite = !!this.mediaFavorites?.find(
      (item) => item.id === this.mediaContent.id
    );
  }

  favoriteMedia() {
    this.mediaFavorites?.unshift(this.mediaContent);
    this.localStorageService.setItem('fav', this.mediaFavorites);
    this.isFavorite = !this.isFavorite;
  }
  unFavoriteMedia() {
    const removeFavorite = this.mediaFavorites.filter(
      (item) => item.id !== this.mediaContent.id
    );
    this.localStorageService.setItem('fav', removeFavorite);
    this.toogleFavorite();
  }

  toogleFavorite(): void {
    this.isFavorite = !this.isFavorite;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.mediaType = params.get('type')!;
      this.mediaId = params.get('id')!;
      this.fetchMediaDetails(this.mediaType, this.mediaId);
    });
  }
}
