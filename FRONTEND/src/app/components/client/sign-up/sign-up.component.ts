import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Client } from 'src/app/model/client';
import { ClientService } from 'src/app/service/client/client.service';
import { NotificationService } from 'src/app/service/notification/notification.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  client: Client = new Client();
  
  signUpForm: FormGroup = new FormGroup({
    login: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z]{3,20}$')]),
    password: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9]{3,20}$')]),
    confirmPassword: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9]{3,20}$')]),
    lastName: new FormControl('', [Validators.required]),
    firstName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    codeCity: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{5}$')]),
    country: new FormControl('', [Validators.required]),
    civility: new FormControl('', [Validators.required]),
});

  @Output() hasAccount = new EventEmitter<boolean>();
  @Output() user = new EventEmitter<Client>();
  
  constructor(private notifService: NotificationService, private clientService: ClientService) { }

  onSignUp() {
    this.signUpForm.markAllAsTouched();
    
    if(this.signUpForm.valid) {
      this.addClient();
      return;
    }
    if(this.signUpForm.controls.login.invalid) {
      if(this.signUpForm.controls.login.errors?.required){
        this.notifService.error('L\'identifiant est requis', 3000);
      }
      else{
        this.notifService.error('L\'identifiant doit contenir entre 3 et 20 caractères', 3000);
      }
    }
    else{
      if(this.signUpForm.controls.password.errors?.required){
        this.notifService.error('Le mot de passe est requis', 3000);
      }
      else if(this.signUpForm.controls.password.value !== this.signUpForm.controls.confirmPassword.value){
        this.notifService.error('Les mots de passe ne correspondent pas', 3000);
      }
      else if(this.signUpForm.controls.password.errors?.pattern){
        this.notifService.error('Le mot de passe doit contenir entre 3 et 20 caractères', 3000);
      }
    }
  }

  addClient() {
    this.clientService.add(this.client).subscribe(  
      //success
      (data) => {
        this.notifService.success('Client ajouté avec succès', 3000);
        this.clientService.login(this.client.login, this.client.password).subscribe(
          //success
          (data) => {
            this.notifService.success('Connexion réussie', 3000);
            this.user.emit(data);
          },
          //error
          (error) => {
            this.notifService.error('Erreur lors de la connexion', 3000);
          }
        );
      },
      //error
      (error) => {
        this.notifService.error('Erreur lors de l\'ajout du client', 3000);
      }
    );
  }

  updateHasAccount() {
    this.hasAccount.emit(true);
  }
}
