import { Component } from '@angular/core';
import { Client } from './model/client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'projetweb';
  isConnected = false;
  username = '';
  id = '';

  connected(user: Client) {
    this.isConnected = true;
    this.username = user.login;
    this.id = user.id;
  }

  disconnected() {
    this.isConnected = false;
    this.username = '';
  }

}
