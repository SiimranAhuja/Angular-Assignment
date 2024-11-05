import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrl: './view.component.css'
})
export class ViewComponent implements OnInit {
  propertyId?: string;
  public data: any;
  public commentData: any;
  public message: string = '';
  public user: any

  constructor(private route: ActivatedRoute, private apiService: ApiService, private router: Router) { }
  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.route.params.subscribe(params =>
      this.propertyId = params['id']
    );
    if (this.propertyId) {
      this.getData(this.propertyId);
    }
  }

  public onDelete(): void {
    this.apiService.deleteData(this.propertyId).subscribe(
      response => {
        console.log('Delete successful:', response);
      },
      error => {
        console.error('Delete failed:', error);
      }
    );
    this.router.navigate(['']);
  }

  private getData(id: string): void {
    this.apiService.getDataById(id).subscribe((response) => {
      this.data = response;
      this.getCommentData(this.data.id);
    }, (error) => {
      console.error('Error fetching data', error);
    }
    )
  }
  private getCommentData(id: string): void {
    this.apiService.getCommentDataById(id).subscribe((response) => {
      this.commentData = response;
    }, (error) => {
      console.error('Error fetching data', error);
    }
    )
  }
  public addComment(): void {
    if(this.message){
    const commentData = {message: this.message, propertyId: this.propertyId}
    this.apiService.addComment(commentData).subscribe((response)=> {
      console.log('Comment added:', response);
      this.message = '';
      this.getCommentData(this.data.id);
    },
    error => {
      console.error('Error adding property:', error);
    }
  )
  } else {
    alert("Please Enter the Comment");
  }
}
}
