import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  data: any[] = [];
  filteredData: any[] = [];
  public form: FormGroup;
  constructor(private apiService: ApiService, private fb: FormBuilder, private router: Router) {
    this.form = this.fb.group({
      range: [''],
      location: [''],
      amenities: [[]],
    });
  }

  public ngOnInit(): void {
    this.apiService.getData().subscribe(
      (response) => {
        this.data = response;
        this.filteredData = response;
      },
      (error) => {
        console.error('Error fetching data', error);
      }
    );
    this.form.get('range')?.valueChanges.subscribe(value => {
      this.applyFilters();
    });
    this.form.get('location')?.valueChanges.subscribe(value => {
      this.applyFilters();
    });
  }

  private applyFilters(): void {
    this.filteredData = [...this.data];

    const rangeValue = this.form.get('range')?.value;
    if (rangeValue) {
      this.filteredData = this.filteredData.filter(item => {
        if (rangeValue === "Less than 10000") {
          return item.rent < 10000;
        } else if (rangeValue === "10,000 - 20,000") {
          return item.rent >= 10000 && item.rent < 20000;
        } else if (rangeValue === "20,000 - 50,000") {
          return item.rent >= 20000 && item.rent < 50000;
        } else if (rangeValue === "50,000 - 1,00,000") {
          return item.rent >= 50000 && item.rent <= 100000;
        }
        return true; 
      });
    }

    const locationValue = this.form.get('location')?.value;
    if (locationValue) {
      this.filteredData = this.filteredData.filter(item => item.address.includes(locationValue));
    }
    const selectedAmenities = this.form.get('amenities')?.value;
    if (selectedAmenities.length > 0) {
        this.filteredData = this.filteredData.filter(item => 
            selectedAmenities.every((amenity: any) => 
                item.amenities.some((propAmenity: { name: any; }) => propAmenity.name === amenity)
            )
        );
    }
  }
}
