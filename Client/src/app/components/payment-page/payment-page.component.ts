import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.scss']
})
export class PaymentPageComponent implements OnInit {

  constructor() { }

  redirectUrl = '';
  logOutUrl = '/.auth/logout'

  ngOnInit(): void {

    this.redirectUrl =  '?post_logout_redirect_uri=' + '/login';
    this.logOutUrl += this.redirectUrl;

    
  }

}
