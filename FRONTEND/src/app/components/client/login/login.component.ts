import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Client } from 'src/app/model/client';
import { ClientService } from 'src/app/service/client/client.service';
import { NotificationService } from 'src/app/service/notification/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  @Output() user = new EventEmitter<Client>();

  loginForm: FormGroup = new FormGroup({
    login: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z]{3,20}$')]),
    password: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9]{3,20}$') ])
  });

  hasAccount = true;

  constructor(private clientService: ClientService, private notifService: NotificationService) { }
  
  onSubmit() {
    this.loginForm.markAllAsTouched();

    if (this.loginForm.invalid) {
      if(this.loginForm.controls.login.invalid) {
        if(this.loginForm.controls.login.errors?.required){
          this.notifService.error('L\'identifiant est requis', 3000);
        }
        else{
          this.notifService.error('L\'identifiant doit contenir entre 3 et 20 caractères', 3000);
        }
      }
      else{
        if(this.loginForm.controls.password.errors?.required){
          this.notifService.error('Le mot de passe est requis', 3000);
        }
        else{
          this.notifService.error('Le mot de passe doit contenir entre 6 et 20 caractères', 3000);
        }
      }
    }
    else{
      this.login()
    }

  }

  login(){
    this.clientService.login(this.loginForm.controls.login.value, this.loginForm.controls.password.value).subscribe(
      (response) => {
        this.updateUser(response);
      }
    );
  }

  updateUser($event: any) {
    this.user.emit($event);
  }

  updateHasAccount($event: boolean) {
    this.hasAccount = $event;
  }
}

