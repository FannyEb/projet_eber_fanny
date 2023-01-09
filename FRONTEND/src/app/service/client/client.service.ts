import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from 'src/app/model/client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  apiUrl: string = environment.api;

  constructor(private http: HttpClient) { }

  login(login: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl+"login", {login: login, password: password});
  }

  add(client: Client): Observable<any> {
    return this.http.post<any>(this.apiUrl+"signup", client);
  }

  get(id: string): Observable<Client> {
    return this.http.get<Client>(this.apiUrl+"client/"+id);
  }
}
