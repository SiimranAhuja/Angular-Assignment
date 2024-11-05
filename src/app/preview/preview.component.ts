import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrl: './preview.component.css'
})
export class PreviewComponent {

  public formData: any;

  images: string[] = [
    'assets/images/apartment1.webp',
    'assets/images/apartment2.jpg',
    'assets/images/apartment3.jpg',
  ];
  constructor(private router: Router, private _apiService: ApiService) {
  const navigation = this.router.getCurrentNavigation();
  if (navigation?.extras.state) {
    this.formData = navigation.extras.state['formData'];
  }
}
 public onSubmit(): void {
  this._apiService.addData(this.formData).subscribe(
    response => {
      console.log('Property added:', response);
      this.router.navigate(['/profile'])
    },
    error => {
      console.error('Error adding property:', error);
    }
  );
 }
}
