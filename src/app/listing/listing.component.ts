import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrl: './listing.component.css'
})
export class ListingComponent {

  @Input() data!: any[];

  constructor(private router: Router){}

  imagePaths = [
    'assets/images/apartment1.webp',
    'assets/images/apartment2.jpg',
    'assets/images/apartment3.jpg',
    'assets/images/apartment8.webp',
    'assets/images/apartment9.webp',
    'assets/images/apartment10.webp',
    'assets/images/apartment11.webp',
  ];
  public viewDetails(id: string): void {
    this.router.navigate([`/view/${id}`]);
  }

  getRandomImage(): string {
    const randomIndex = Math.floor(Math.random() * this.imagePaths.length);
    return this.imagePaths[randomIndex];
  }
}
