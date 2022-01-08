import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { HelloWorldService } from '../../services/hello-world.service';

@Component({
  selector: 'app-hello-world',
  templateUrl: './hello-world.component.html',
  styleUrls: ['./hello-world.component.scss']
})
export class HelloWorldComponent implements OnInit {

  private subscriptions: { [key: string]: Subscription; } = {};

  constructor(private service: HelloWorldService, private router: Router) { }

  message = 'if you are seeing this the api call did not work';
  githubUrl = '/.auth/login/github';
  aadUrl = '/.auth/login/aad';
  googleUrl = '/.auth/login/google';
  redirectUrl = '';

  loading = true;

  ngOnInit(): void {

    console.log('hi');
    this.subscriptions.auth = this.service.getUserDetails().subscribe((result) => {
      console.log(result.clientPrincipal);
      if (result.clientPrincipal) {
        // redirect
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
