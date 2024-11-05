import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  public user!: any;
  data: any[] = [];
  constructor(private _apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!this.user.id) {
      this.router.navigate(['/login']);
    } else {
      this.getDataById(this.user.id);
    }
  }

  private getDataById(id: string) {
    this._apiService.getDataByOwnerId(id).subscribe(
      (response) => {
        this.data = response;
      },
      (error) => {
        console.error('Error fetching data', error);
      }
    );
  }

  public addProperty(): void {
    this.router.navigate(['/create'])
  }

  public logout(): void {
    localStorage.removeItem('user');
    this.router.navigate(['']);
  }
}
