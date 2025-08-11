import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthTokenService } from '../../../services/AuthToken/auth-token.service';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-federation-login',
  imports: [],
  templateUrl: './federation-login.component.html',
  styleUrl: './federation-login.component.css'
})
export class FederationLoginComponent  implements OnInit {


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tokenService: AuthTokenService,
    private authService: AuthService
  ) {}

ngOnInit(): void {
  const token = this.route.snapshot.queryParamMap.get('access_token');
  console.log('Token de URL:', token);
  if (token) {
    this.tokenService.setToken(token);
    console.log('Token guardado:', this.tokenService.getToken());
    this.accessToApplication();
  } else {
    console.error('No se encontró el token en la URL');
  }
}


  accessToApplication() {
    console.log('Accediendo a la aplicación...');
   

    this.authService.access().subscribe({
      
      next: (response) => {
        if (response.status === 'success') {
          this.router.navigate([response.data.path]);
        } else {
          this.router.navigate([response.data.path]);
        }
      },
      error: (error) => {
        this.router.navigate([error.data.path]);
      }
    });
  }
}