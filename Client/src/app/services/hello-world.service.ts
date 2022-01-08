import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { IClientPrincipal } from '../data-types/types';


@Injectable({
  providedIn: 'root'
})

export class HelloWorldService {

  constructor(private http: HttpClient) { }

  getUserDetails(): Observable<{clientPrincipal: IClientPrincipal}> {
    const requestUrl = `${environment.baseUrl}/.auth/me`;
    return this.http.get<{clientPrincipal: IClientPrincipal}>(requestUrl);
  }
  
  createStripeSession(): Observable<{client_secret: string}> { 
    const requestUrl = `${environment.baseUrl}/api/PaymentSecret`;
    return this.http.get<any>(requestUrl);
  }
}
