import { Component } from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import { ActivatedRoute, NavigationEnd, Route, Router, RouterLinkActive } from '@angular/router';
import { Observable} from 'rxjs';
import {map} from 'rxjs/operators';



@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  links = ['search', 'featured'];
  activeLink = this.links[0];
  background: ThemePalette = undefined;
}
