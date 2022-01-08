import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { StripePaymentElementComponent, StripeService } from 'ngx-stripe';
import { Subscription } from 'rxjs/internal/Subscription';
import { HelloWorldService } from 'src/app/services/hello-world.service';

@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.scss']
})
export class PaymentPageComponent implements OnInit, OnDestroy {
  @ViewChild(StripePaymentElementComponent) paymentElement: StripePaymentElementComponent
  private subscriptions: { [key: string]: Subscription; } = {};
  client_secret = '';
  errorMessage = '';
  succeeded = false;
  status ='';

  constructor(private service: HelloWorldService, private fb: FormBuilder, private stripeService: StripeService) { }

  redirectUrl = '';
  logOutUrl = '/.auth/logout'

  ngOnInit(): void {

    this.redirectUrl =  '?post_logout_redirect_uri=' + '/login';
    this.logOutUrl += this.redirectUrl;
    this.createSession();
  }

  createSession(): void {
    this.subscriptions.stripe = this.service.createStripeSession().subscribe((x) => this.client_secret = x.client_secret);
  }

  pay(): void {
    this.stripeService.confirmPayment({
      elements: this.paymentElement.elements,
      redirect: 'if_required'
    }).subscribe((result) => {
      // TODO fill out these stasus better.
      if(result.error) {
        this.errorMessage = result.error.message
      } else {
        if(result.paymentIntent.status === 'succeeded') {
            this.succeeded = true;
        }
        this.status = result.paymentIntent.status;
      }
    })
  }

  ngOnDestroy(): void {
    for (const field of Object.keys(this.subscriptions)) {
      this.subscriptions[field].unsubscribe();
    }
  }
}
