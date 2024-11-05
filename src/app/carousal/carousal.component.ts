import { Component } from '@angular/core';

@Component({
  selector: 'app-carousal',
  templateUrl: './carousal.component.html',
  styleUrl: './carousal.component.css'
})
export class CarousalComponent {
  images: string[] = [
    'assets/images/apartment8.webp',
    'assets/images/apartment9.webp',
    'assets/images/apartment10.webp',
    'assets/images/apartment11.webp',
  ];
  activeIndex: number = 0;

  prev() {
    this.activeIndex = (this.activeIndex - 1 + this.images.length) % this.images.length;
  }

  next() {
    this.activeIndex = (this.activeIndex + 1) % this.images.length;
  }
}
