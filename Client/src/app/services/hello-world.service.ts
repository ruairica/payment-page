import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})

export class HelloWorldService {

  constructor(private http: HttpClient) { }

  testApiEndpoint(): Observable<boolean> {
    const requestUrl = `${environment.baseUrl}/api/HelloWorld`;
    return this.http.get<boolean>(requestUrl);
  }

  createStripeSession(): Observable<any> { 
    const requestUrl = `${environment.baseUrl}/api/PaymentSecret`;
    return this.http.get<any>(requestUrl);
  }
}
