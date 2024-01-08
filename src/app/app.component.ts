import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'TF_FullStack_NET_Azure_demo_token_front';

  constructor(
    private _authService : AuthService
  ){}

  logout(){
    this._authService.Logout()
  }
}
