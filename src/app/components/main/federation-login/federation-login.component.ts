import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthTokenService } from '../../../services/AuthToken/auth-token.service';
import { AuthService } from '../../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../environments/environment';




@Component({
  selector: 'app-federation-login',
  imports: [CommonModule],
  templateUrl: './federation-login.component.html',
  styleUrls: ['./federation-login.component.css']
})
export class FederationLoginComponent  implements OnInit {

  message: string = '';
  messageError: string = '';
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
    console.log('No se encontró el token en la URL');
    this.messageError = 'Acceso denegado.';
    setTimeout(() => {
      window.location.href = `${environment.apiAuth}/oauth/login?redirect_uri=${environment.url}/federation-login`;
    }, 2000);
  }

}


  accessToApplication() {
  
   

    this.authService.access().subscribe({

      next: (response) => {
        if (response.status === 'success') {
          this.message = 'Acceso concedido, redirigiendo...';
          setTimeout(() => {
            this.router.navigate([response.data.path]);
          }, 2000);

        } else {
          this.messageError = 'Acceso denegado.';
          setTimeout(() => {
            this.router.navigate([response.data.path]);
          }, 2000);
        }
      },
      error: (error) => {
        this.messageError = 'Acceso denegado.';
      
          this.router.navigate(['federation-login'], { queryParams: {} });
      
      }
    });
  }
}