import { Component, signal } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { Router } from '@angular/router';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { User, Userservice } from '../../../services/userservice';
@Component({
  selector: 'app-users',
  imports: [MatListModule,MatPaginatorModule],
  templateUrl: './users.html',
  styleUrl: './users.css'
})
export class Users {
  users = signal<User[]>([]);
  currentPage = signal<number>(1);

  length = 0;
  pageSize = 6; 
  pageIndex = 0;
  hidePageSize = true; 
  showFirstLastButtons = true;

  constructor(private userService:Userservice,private router: Router) {
    
  }
  ngOnInit(): void {
    this.loadUsers(1);
  }

  loadUsers(page: number): void {
    this.userService.getUsers(page).subscribe({
      next: (res) => {
        this.users.set(res.data);
        this.length = res.total;
        this.pageIndex = res.page - 1;
      },
      error: (err) => console.error('error', err)
    });
  }

  goToDetails(id: number): void {
    this.router.navigate(['/', id]);
  }

  handlePageEvent(e: PageEvent) {
    this.pageIndex = e.pageIndex;
    this.loadUsers(e.pageIndex + 1); 
  }

}
