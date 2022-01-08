import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { StripePaymentElementComponent, StripeService } from 'ngx-stripe';
import { Subscription } from 'rxjs/internal/Subscription';
import { Service } from 'src/app/services/service.service';

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

  constructor(private service: Service, private fb: FormBuilder, private stripeService: StripeService) { }

  logOutUrl = '/.auth/logout?post_logout_redirect_uri=/login'
  userName = ''

  ngOnInit(): void {
    this.service.getUserDetails().subscribe((result) => this.userName = result.clientPrincipal.userDetails);
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
      if(result.error) {
        this.errorMessage = result.error.message
      } else {
        if(result.paymentIntent.status === 'succeeded') {
            this.succeeded = true;
        }
        this.errorMessage = '';
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
