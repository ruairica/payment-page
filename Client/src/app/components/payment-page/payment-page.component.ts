import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { HelloWorldService } from 'src/app/services/hello-world.service';
@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.scss']
})
export class PaymentPageComponent implements OnInit {

  private subscriptions: { [key: string]: Subscription; } = {};
  client_secret = '';

  constructor(private service: HelloWorldService) { }

  redirectUrl = '';
  logOutUrl = '/.auth/logout'

  ngOnInit(): void {

    this.redirectUrl =  '?post_logout_redirect_uri=' + '/login';
    this.logOutUrl += this.redirectUrl;
  }

  createSession(): void {
    this.subscriptions.stripe = this.service.createStripeSession().subscribe((x) => this.client_secret = x.client_secret);
  }

  ngOnDestroy(): void {
    for (const field of Object.keys(this.subscriptions)) {
      this.subscriptions[field].unsubscribe();
    }
  }
}
