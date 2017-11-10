import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../auth.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private log: MessageService) { }

  ngOnInit() {
  }

  doLogin() {
    this.auth.login('just.a.user', 'foo').subscribe(r => {
      this.log.add('Got a token ' + r.token);
    });
  }

}
