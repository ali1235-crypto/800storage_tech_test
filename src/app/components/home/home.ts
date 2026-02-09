import { Component } from '@angular/core';
import { Header } from "./header/header";
import { Users } from "./users/users";

@Component({
  selector: 'app-home',
  imports: [Header, Users],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home  {


}
