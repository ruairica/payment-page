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
    NgxStripeModule.forRoot('pk_live_51KBOjaItAOPho2b6ZPCVoO6qkVR0PN0gINuyrlntZNnoSAUG2kQ33qjbCWVXSdPSqDIgZIZueVdb6oTorpA6Su9900m6MwehVd')
    ],
  bootstrap: [AppComponent]
})
export class AppModule {}
