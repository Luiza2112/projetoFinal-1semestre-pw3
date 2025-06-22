import { Routes } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { HomeComponent } from './home/home.component';
import { Component } from '@angular/core'

export const routes: Routes = [
    {path: '', component: LoginComponent},
    {path: 'home', component: HomeComponent}
];
