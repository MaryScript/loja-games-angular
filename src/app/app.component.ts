// src/app/app.component.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // RouterModule nos dá o router-outlet e o routerLink

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule // Importe o RouterModule completo aqui
  ],
  templateUrl: './app.html', // APONTANDO PARA O ARQUIVO HTML
  styleUrls: ['./app.css']
})
export class AppComponent {
  title = 'loja-games';
}