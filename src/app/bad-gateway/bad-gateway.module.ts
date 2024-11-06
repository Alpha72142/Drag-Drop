import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BadGatewayRoutingModule } from './bad-gateway-routing.module';
import { BadGatewayComponent } from './bad-gateway.component';

@NgModule({
  imports: [
    CommonModule,
    BadGatewayRoutingModule
  ],
  declarations: [BadGatewayComponent]
})
export class BadGatewayModule { }
