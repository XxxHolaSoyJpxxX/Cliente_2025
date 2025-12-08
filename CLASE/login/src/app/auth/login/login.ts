import { GoogleLoginProvider, GoogleSigninButtonModule, SocialAuthService } from "@abacritt/angularx-social-login";
import { Component, OnInit } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-login',
  standalone: true,          // ← ESTO ES OBLIGATORIO
  templateUrl: './login.html',
  styleUrl: './login.scss',
  imports: [CommonModule, GoogleSigninButtonModule]
})
export class Login implements OnInit {

  accessToken = '';
  user: any;

  constructor(
    private authService: SocialAuthService,
    private httpClient: HttpClient
  ) { }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      console.log('Usuario logueado:', user);
      this.getAccessToken();
    });
  }

  getAccessToken(): void {
    this.authService.getAccessToken(GoogleLoginProvider.PROVIDER_ID)
      .then(accessToken => {
        this.accessToken = accessToken;
        console.log('Token de acceso:', this.accessToken);
      });
  }
  refreshToken(): void {
    this.authService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
  }

  verifyToken(): void {
    const url = `https://chat-express-api-3fpl.onrender.com/auth/google?token=${this.accessToken}`;

    this.httpClient.get(url).subscribe(
      (response) => console.log('Token válido:', response),
      (error) => console.error('Token inválido:', error)
    );
  }

}
