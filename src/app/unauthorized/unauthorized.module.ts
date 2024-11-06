import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UnauthorizedRoutingModule } from './unauthorized-routing.module';
import { UnauthorizedComponent } from './unauthorized.component';

@NgModule({
  imports: [
    CommonModule,
    UnauthorizedRoutingModule
  ],
  declarations: [UnauthorizedComponent]
})
export class UnauthorizedModule { }
