import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-page-notfound',
  templateUrl: './page-notfound.component.html',
  styleUrls: ['./page-notfound.component.css']
})
export class PageNotfoundComponent {
  currentRoute: string = "";
  homeLink: string = "";

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToLandingPage(): void {
    window.location.href = 'https://digitalmind-upc-pre-202202-si729-sw52.github.io';
  }
}
