import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { HomeComponent } from './home/home.component';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-root',
  //imports: [RouterOutlet, LoginComponent],
  imports: [HomeComponent, LoginComponent, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pw3-projetoTCC';
}
