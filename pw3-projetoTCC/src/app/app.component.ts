import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { CabecalhoComponent } from "./cabecalho/cabecalho.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoginComponent, CabecalhoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'pw3-projetoTCC';
}
