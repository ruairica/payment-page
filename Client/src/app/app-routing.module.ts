import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HelloWorldComponent } from './components/hello-world/hello-world.component';
import { PaymentPageComponent } from './components/payment-page/payment-page.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        component: HelloWorldComponent,
      },
      {
        path: 'pay',
        component: PaymentPageComponent,
      },
      {
        path: '**',
        redirectTo: '/login'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
