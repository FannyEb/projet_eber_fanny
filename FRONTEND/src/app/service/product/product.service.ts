import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  apiUrl: string = environment.api;

  constructor(private http: HttpClient) { }

  getProducts(): Observable<any> {
    return this.http.get(this.apiUrl+"product");
  }

  getProduct(id: string): Observable<any> {
    return this.http.get(this.apiUrl+"product/"+id);
  }

}
