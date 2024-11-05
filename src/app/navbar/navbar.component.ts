import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  public user?: any

  constructor( private router: Router){}
  public ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.user = user ? user : null;
  }

  public logout(): void {
    localStorage.removeItem('user');
    this.router.navigate(['/authenticate', 'login']);
  }
}
