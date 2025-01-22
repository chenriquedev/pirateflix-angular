import { Component, ViewEncapsulation } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { AvatarModule } from 'primeng/avatar';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [MenubarModule, AvatarModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class NavbarComponent {
  items: MenuItem[] | undefined;
  icon: string = 'assets/images/logo1.png'

  ngOnInit() {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        route: '',
      },
      {
        label: 'Movies',
        icon: 'pi pi-video',
        route: 'movies',
      },
      {
        label: 'Series',
        icon: 'pi pi-play-circle',
        route: 'series',
      },
    ];
  }
}
