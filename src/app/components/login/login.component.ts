import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginForm } from 'src/app/models/LoginForm.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public LoginForm : FormGroup
  public user : LoginForm
  public errorMessage = ""

  constructor(
    private _route : Router,
    private _authService : AuthService,
    private _formBuilder : FormBuilder
  ) { }

  ngOnInit(): void {
    this.LoginForm = this._formBuilder.group({
      email : [null, [Validators.email, Validators.required]],
      mdp : [null, [Validators.email, Validators.required]]
    })
  }

  login(){
    this.user = new LoginForm
    this.user.email = this.LoginForm.value["email"]
    this.user.password = this.LoginForm.value["mdp"]
    let currentUser : User
    this._authService.Login(this.user).subscribe({
      next : (data) => {
        currentUser = data
        for(let key in data) {
          document.cookie = `${key}=${btoa(data[key])}`
        }
        if (currentUser != null) {
          console.log(`L'utilisateur ${currentUser.prenom} est connecté !`)
        }
      },
      error : (error) => {
        this.errorMessage = `Connexion refusé ! \n error : ${error}`
      },
      complete : () => {
        // si tout va bien....
        this._route.navigate(["home"])
      }
    })
  }
}
