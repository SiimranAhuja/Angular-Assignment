import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user && user.role) {
      return true;
    }
    alert("Please Login/Register to view the details of the Property");
    this.router.navigate(['authenticate/login']);
    return false;
  }
}