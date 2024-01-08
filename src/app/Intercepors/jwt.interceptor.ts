import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private _authService : AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    // Récupérer l'utilisateur actuel du service d'authentification
    const currentUser = this._authService.currentUserValue

    // Vérifier si l'utilisateur est connecté et possède un jeton (token)
    const isConnected = currentUser && currentUser.token

    // Vérifier si la requête est destinée a l'api (définie dans l'environement)
    const isApiUrl = request.url.startsWith(environment.apiUrl)

    // Si l'utilisateur est connecté et la requête est pour l'API, ajouter le jeton jwt dans l'en-tête d'authentification
    if (isConnected && isApiUrl) {
      request = request.clone({
        setHeaders:{
          Authorization : `Bearer ${currentUser.token}`
        }
      })
    }
    // Passer la requête modifié au gestionnaire suivant dans la chaine des intercepteurs
    return next.handle(request)
  }

}
