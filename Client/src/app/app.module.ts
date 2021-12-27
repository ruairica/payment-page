import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HelloWorldComponent } from './components/hello-world/hello-world.component';
import { PaymentPageComponent } from './components/payment-page/payment-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxStripeModule } from 'ngx-stripe';



@NgModule({
  declarations: [AppComponent, HelloWorldComponent, PaymentPageComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
