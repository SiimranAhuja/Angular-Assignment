import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {

  public form: FormGroup;

  public amenitiesList = [
    'gym',
    'swimmingPool',
    'carPark',
    'visitorsParking',
    'powerBackup',
    'garbageDisposal',
    'privateLawn',
    'waterHeater',
    'securitySystem',
    'laundryService',
    'elevator',
    'clubHouse'
  ];

  constructor(private fb: FormBuilder, private router: Router) {
    this.form = this.fb.group({
      type: ['', Validators.required],
      shared: ['', Validators.required],
      address: ['', Validators.required],
      squareFeet: ['', Validators.required],
      stay: ['', Validators.required],
      rent: ['', Validators.required],
      negotiable: [false, Validators.required],
      perMonth: [false, Validators.required],
      utilitiesIncluded: [false, Validators.required],
      furnished: ['', Validators.required],
      amenities: this.fb.group({
        gym: [false],
        swimmingPool: [false],
        carPark: [false],
        visitorsParking: [false],
        powerBackup: [false],
        garbageDisposal: [false],
        privateLawn: [false],
        waterHeater: [false],
        securitySystem: [false],
        laundryService: [false],
        elevator: [false],
        clubHouse: [false],
      }),
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit(): void { }

  onSubmit(): void {
    if (this.form.valid) {
      const formData = this.form.value;
      const amenitiesArray = this.amenitiesList
        .filter(amenity => formData.amenities[amenity])
        .map((amenity, index) => ({ id: index + 1, name: this.capitalizeFirstLetter(amenity) }));
      const dataToSend = {...formData, amenities: amenitiesArray};
      this.router.navigate(['/preview'], { state: { formData: dataToSend } });
    } else {
      this.form.markAllAsTouched();
    }
  }

  private capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}
