import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.css'
})
export class AuthenticationComponent {
  public type?: string;
  public form: FormGroup;
  constructor(private route: ActivatedRoute, private fb: FormBuilder, private router: Router, private _apiService: ApiService) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
    })
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.type = params['type'];
      if (this.type === 'login') {
        this.form.removeControl('role');
        this.form.removeControl('username');
      }
    });
    if (localStorage.getItem('user')) {
      this.router.navigate(['/profile']);
    }
  }

  public onLogin(): void {
    if (this.form.valid) {
      const { email, password } = this.form.value;
      this._apiService.login(email, password).subscribe(user => {
        if (user) {
          localStorage.setItem('user', JSON.stringify({ id: user.id, email: user.email, username: user.username, role: user.role }));
          this.router.navigate(['/']);
        }
      },
        error => {
          console.error('Login failed:', error);
          alert('Invalid username or password. Please try again.');
        }
      );
    }
  };

  public onRegister(): void {
    if (this.form.valid) {
      this._apiService.registerUser(this.form.value).subscribe(
        (user) => {
          console.log('User registered:', user);
          this.router.navigate(['/']);
        },
        error => {
          console.error('Error registering user:', error);
        }
      );
    }
  }
}
