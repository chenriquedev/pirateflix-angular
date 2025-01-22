import { Routes } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { MoviesComponent } from './page/movies/movies.component';
import { SeriesComponent } from './page/series/series.component';
import { ViewDetailedComponent } from './page/view-detailed/view-detailed.component';
import { FavoriteComponent } from './page/favorite/favorite.component';

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
  },
  {
    path:"details/:type/:id",
    component: ViewDetailedComponent,
    title: "DETAILED"
  },
  {
    path: "favorites",
    component: FavoriteComponent,
    title: "FAVORITES"
  },
  {
    path: "**",
    redirectTo: "",
    pathMatch: 'full'
  }
];
