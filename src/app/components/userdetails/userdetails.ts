import { Component, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import { User, Userservice } from '../../services/userservice';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-userdetails',
  imports: [MatCardModule, MatButtonModule,MatIconModule],
  templateUrl: './userdetails.html',
  styleUrl: './userdetails.css',
})
export class Userdetails implements OnInit{
  user = signal<User | null>(null);

  constructor(
    private route: ActivatedRoute,
    private userService: Userservice,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    
    if (id) {
      this.userService.getUserById(+id).subscribe({
        next: (res) => this.user.set(res.data),
        error: (err) => console.error('error', err)
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

}
