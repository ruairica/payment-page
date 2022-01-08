import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { Service } from 'src/app/services/service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private subscriptions: { [key: string]: Subscription; } = {};

  constructor(private service: Service, private router: Router) { }

  message = 'if you are seeing this the api call did not work';
  githubUrl = '/.auth/login/github';
  aadUrl = '/.auth/login/aad';
  googleUrl = '/.auth/login/google';
  redirectUrl = '';

  loading = true;

  ngOnInit(): void {
    this.subscriptions.auth = this.service.getUserDetails().subscribe((result) => {
      if (result.clientPrincipal) {
        // redirect if authenticated.
        this.router.navigate(['/pay'])
      } else {
        this.loading = false;
      }
    })

    this.redirectUrl =  '?post_login_redirect_uri=' + location.origin + '/pay'
    this.githubUrl += this.redirectUrl;
    this.aadUrl += this.redirectUrl;
    this.googleUrl += this.redirectUrl;
  }



  ngOnDestroy(): void {
    for (const field of Object.keys(this.subscriptions)) {
      this.subscriptions[field].unsubscribe();
    }
  }
}
