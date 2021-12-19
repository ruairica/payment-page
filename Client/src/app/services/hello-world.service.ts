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

  loginGithub(): Observable<any> {
    const requestUrl = `${environment.baseUrl}/.auth/login/github`;
    return this.http.get<boolean>(requestUrl);
  }
}
