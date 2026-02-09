import { Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { catchError, debounceTime, distinctUntilChanged, filter, finalize, of, switchMap, tap } from 'rxjs';
import { User, Userservice } from '../../../services/userservice';
import { Router } from '@angular/router';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
@Component({
  selector: 'app-header',
  imports: [MatFormFieldModule, MatInputModule, MatIconModule, ReactiveFormsModule, MatAutocompleteModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  searchControl = new FormControl('');
  foundUser = signal<User | null>(null);
  isLoading = signal<boolean>(false);

constructor(private userService: Userservice, private router: Router) {
    this.searchControl.valueChanges.pipe(
      debounceTime(400), 
      distinctUntilChanged(),
      filter(value => value !== null && value !== ''),
      tap(() => this.isLoading.set(true)),
      switchMap(id => {
        return this.userService.getUserById(Number(id)).pipe(
          catchError(() => {
            this.foundUser.set(null); 
            return of(null);
          }),
          finalize(() => this.isLoading.set(false))
        );
      })
    ).subscribe(response => {
      if (response) {console.log(response.data);
        this.isLoading.set(false);
        this.foundUser.set(response.data);
      }
    });
  }
  
  onUserSelected(user: User) {
    this.router.navigate(['/', user.id]);
    this.searchControl.setValue(''); 
    this.foundUser.set(null);
  }
    


}
