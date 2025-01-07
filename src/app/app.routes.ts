import { Routes } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { MoviesComponent } from './page/movies/movies.component';
import { SeriesComponent } from './page/series/series.component';

export const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    title: "HOME"
  },
  {
    path: "movies",
    component: MoviesComponent,
    title: "MOVIES"
  },
  {
    path: "series",
    component: SeriesComponent,
    title: "SERIES"
  }
];
