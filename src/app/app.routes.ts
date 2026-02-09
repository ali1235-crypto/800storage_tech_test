import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Userdetails } from './components/userdetails/userdetails';

export const routes: Routes = [
    {path: '', component:Home,pathMatch:'full'},
    {path: ':id', component:Userdetails}
];
