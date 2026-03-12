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
    // this.router.navigate(['/user']);
    window.open('/user', '_blank');
  }

  goToAdmin() {
    // this.router.navigate(['/admin']);
    window.open('/admin', '_blank');
  }
 }
