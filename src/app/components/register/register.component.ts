import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterForm } from 'src/app/models/RegisterForm.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public registerForm : FormGroup
  public user : RegisterForm
  public errorMessage = ""

  constructor(
    private _router : Router,
    private _AuthService : AuthService,
    private _formBuilder : FormBuilder
  ) { }

  ngOnInit(): void {
    this.registerForm = this._formBuilder.group({
      nom : [null, [Validators.required]],
      prenom : [null, [Validators.required]],
      dateNaissance : [null, [Validators.required]],
      email : [null, [Validators.email ,Validators.required]],
      mdp : [null, [Validators.email ,Validators.required]]
    })
  }

  register(){
    this.user = new RegisterForm;
    this.user.nom = this.registerForm.value['nom']
    this.user.prenom = this.registerForm.value['prenom']
    this.user.dateNaissance = this.registerForm.value['dateNaissance']
    this.user.email = this.registerForm.value['email']
    this.user.password = this.registerForm.value['password']

    this._AuthService.Register(this.user).subscribe({
      next : () => {
        console.log("enregistrement lancé !")
      },
      error : (error) => {
        this.errorMessage = `L'enregistrement à échoué... \n error : ${error}`
      },
      complete : () => {
        // si tout va bien....
        this._router.navigate(["home"])
      }
    })
  }
}
