import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { RegisterForm } from '../models/RegisterForm.model';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../models/LoginForm.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _currentUserSubject : BehaviorSubject<User>;

  // Getter pour obtenir la valeur courante de l'utilisateur
  public get currentUserValue(): User{
    return this._currentUserSubject.value;
  }

  // Initialisation du service avec le client HTTP et le router
  constructor(
    private _client : HttpClient,
    private _route : Router
  ) {
    // Inititialisation du sujet BehaviorSubjet avec l'utilisateur actuel stocké dans le session storage
    this._currentUserSubject = new BehaviorSubject<User>(JSON.parse(sessionStorage.getItem('currentUser')));
  }

  Register(userRegister : RegisterForm) : Observable<any>{
    return this._client.post(`${environment.apiUrl}/Auth/Register`, userRegister)
  }

  Login(userLogin : LoginForm) : Observable<any>{
    return this._client.post<any>(`${environment.apiUrl}/Auth/Login`, userLogin,)
    .pipe(map(user =>{
      // Inserer l'utilisateur dans le sessionStorage
      sessionStorage.setItem('currentUser', JSON.stringify(user))
      // Mettre à jour le sujet BehaviourSubjet avec le nouvel utilisateur
      this._currentUserSubject.next(user)
      return user
    }))
  }

  Logout(){
    // Supprimer l'utilateur du sessionStorage
    sessionStorage.removeItem('currentUser')
    // Mettrea à jour le sujet BehaviourSubjet avec la valeur null
    this._currentUserSubject.next(null)

    console.log("Déconnecté !")
  }
}
