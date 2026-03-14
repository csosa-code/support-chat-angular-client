import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export default class HomeComponent {

  private router = inject(Router);

  goToUser() {
    window.open(`${document.baseURI}user`, '_blank');
  }
  
  goToAdmin() {
    window.open(`${document.baseURI}admin`, '_blank');
  }
 }
