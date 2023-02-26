import { Component } from '@angular/core';
import {ThemePalette} from '@angular/material/core';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  links = ['SEARCH MOVIE', 'FEATURED MOVIE'];
  activeLink = this.links[0];
  background: ThemePalette = undefined;
}
