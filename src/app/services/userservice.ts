import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


export interface User {
  id: number;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface UserResponse {
  data: User[];
  page: number;
  total_pages: number;
  total: number;
}

@Injectable({
  providedIn: 'root',
})
export class Userservice {

  private readonly baseUrl = 'https://reqres.in/api/users'; 


  constructor(private http: HttpClient) {}

  getUsers(page: number): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${this.baseUrl}?page=${page}`); 
  }


  getUserById(id: number): Observable<{ data: User }> {
    return this.http.get<{ data: User }>(`${this.baseUrl}/${id}`); 
  }
  
}
