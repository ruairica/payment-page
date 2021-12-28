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
    NgxStripeModule.forRoot('pk_test_51KBOjaItAOPho2b6nRFdSOjpGqMFOJoLzEZ247o789T26KrChfieGLk9STaW2xbQJ8fS3zSvYl8f4oYgsUiRkzVT005Att55m3')
    ],
  bootstrap: [AppComponent]
})
export class AppModule {}
