import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://localhost:3000/properties';

  private apiUser = 'http://localhost:3000/users';

  private apiComment = 'http://localhost:3000/comments';

  public user = JSON.parse(localStorage.getItem('user') || '{}');

  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getCommentDataById(id: string): Observable<any> {
    return this.http.get<any[]>(this.apiComment).pipe(
      map((response) => response.filter((item) => item.propertyId === id))
    );
  }

  getDataByOwnerId(id: string): Observable<any> {
    return this.http.get<any>(this.apiUrl).pipe(
      map((response) => response.filter((item: any) => item.ownerId === id))
    );
  }
  getDataById(id: string): Observable<any> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((response) => response.find((item) => item.id === id))
    );
  }

  getUserDataById(id: string): Observable<any> {
    return this.http.get<any[]>(this.apiUser).pipe(
      map((response)=> response.filter((item) => item.id == id))
    )
  }

  addData(data: object): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const ownerId = this.user.id;
    if (user.id) {
      const modifiedData = { ...data, ownerId };
      return this.http.post(this.apiUrl, modifiedData).pipe(
        catchError(this.handleError) 
      )
    } else {
      return throwError('Owner ID is missing');
    }
  }

  public addComment(data: object) : Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const username = this.user.username;
    const userId = this.user.id;
    if (user.id) {
      const modifiedData = { ...data, username, userId };
      return this.http.post(this.apiComment, modifiedData).pipe(
        catchError(this.handleError) 
      )
    } else {
      return throwError('Owner ID is missing');
    }
  }
  deleteData(id: any): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError) // Optional: handle errors
    );
  }

  registerUser(data: any): Observable<any> {
    return this.http.get<any[]>(this.apiUser).pipe(
      map(users => {
        const user = users.find(u => u.email === data.email);
        if (user) {
          alert("This email already exists, please use different email or please login");
        } else {
          this.addUser(data).subscribe(
            (response) => {
              console.log(response);
              localStorage.setItem('user', JSON.stringify(response)); 
              alert("User registered successfully!");
            },
            (error) => {
              console.error("Registration failed", error);
              alert("There was an error registering the user.");
            }
          );
        }
      }),
      catchError(error => {
        console.error("Error during registration", error);
        return throwError(() => new Error('Login failed: Invalid username or password'));
      })
    );
  }

  addUser(data: object) : Observable<any> {
    return this.http.post(this.apiUser, data);
  }

  login(email: string, password: string): Observable<any> {
    return this.http.get<any[]>(this.apiUser).pipe(
      map(users => {
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
          return user;
        } else {
          throw new Error('Invalid credentials');
        }
      }),
      catchError(error => {
        return throwError(() => new Error('Login failed: Invalid username or password'));
      })
    );
  }
  // Optional: Define an error handling method
  private handleError(error: any): Observable<never> {
    // Handle the error as needed (e.g., log it or return a user-friendly message)
    console.error('An error occurred:', error);
    return throwError(error);
  }
}
